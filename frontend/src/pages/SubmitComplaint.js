import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography, Box, Alert,
  FormControl, InputLabel, Select, MenuItem, Grid, Chip
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { complaintService } from '../services/authService';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    lat: '',
    lng: ''
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          });
        },
        (error) => {
          setError('Unable to get location. Please enter manually.');
        }
      );
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      files.forEach((file) => {
        submitData.append('media', file);
      });

      const response = await complaintService.submitComplaint(submitData);
      setSuccess(`Complaint submitted successfully! Your complaint ID is: ${response.complaintId}`);
      
      setFormData({
        title: '',
        description: '',
        category: '',
        address: '',
        lat: '',
        lng: ''
      });
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" textAlign="center" gutterBottom className="gradient-text">
            Report Environmental Issue
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issue Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                    label="Category"
                  >
                    <MenuItem value="road_damage">Road Damage</MenuItem>
                    <MenuItem value="tree_maintenance">Tree Maintenance</MenuItem>
                    <MenuItem value="infrastructure">Infrastructure</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" gap={1}>
                  <TextField
                    fullWidth
                    label="Location Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outlined"
                    onClick={getCurrentLocation}
                    startIcon={<LocationOnIcon />}
                  >
                    GPS
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>

              {formData.lat && formData.lng && (
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1} p={1} bgcolor="success.light" borderRadius={1}>
                    <LocationOnIcon sx={{ color: 'success.main' }} />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      📍 Location captured: {parseFloat(formData.lat).toFixed(4)}, {parseFloat(formData.lng).toFixed(4)}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        window.open(`https://www.google.com/maps?q=${formData.lat},${formData.lng}`, '_blank');
                      }}
                    >
                      View on Map
                    </Button>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f0f0' : 'transparent'
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    Upload Photos/Videos
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Drag & drop files here, or click to select (Max 5 files)
                  </Typography>
                </Box>

                {files.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Selected Files:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {files.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => removeFile(index)}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? 'Submitting...' : 'Submit Complaint'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default SubmitComplaint;