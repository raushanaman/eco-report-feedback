import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Dialog, DialogTitle, DialogContent, TextField,
  FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem
} from '@mui/material';
import { adminService } from '../services/authService';
import getApiConfig from '../config/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateDialog, setUpdateDialog] = useState({
    open: false,
    complaint: null
  });
  const [newStatus, setNewStatus] = useState('');

  const { mediaURL } = getApiConfig();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, complaintsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllComplaints()
      ]);
      setStats(statsData);
      setComplaints(complaintsData);
    } catch (error) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await adminService.updateComplaintStatus(
        updateDialog.complaint._id,
        newStatus
      );
      setUpdateDialog({ open: false, complaint: null });
      setNewStatus('');
      fetchData();
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'assigned': return 'info';
      case 'in_progress': return 'primary';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom className="gradient-text">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Complaints
              </Typography>
              <Typography variant="h4">
                {stats.totalComplaints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pendingComplaints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.resolvedComplaints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Overdue
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.overdueComplaints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        All Complaints
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Media</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>{complaint.complaintId}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint.category.replace('_', ' ')}</TableCell>
                <TableCell>
                  <Chip
                    label={complaint.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(complaint.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{complaint.userId?.name}</TableCell>
                <TableCell>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {complaint.media && complaint.media.length > 0 ? (
                    <Box sx={{ width: 100, height: 60 }}>
                      <img
                        src={`${mediaURL}${complaint.media[0].url}`}
                        alt="Complaint"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 4
                        }}
                      />
                      {complaint.media.length > 1 && (
                        <Typography variant="caption">
                          +{complaint.media.length - 1} more
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      No media
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setUpdateDialog({ open: true, complaint });
                      setNewStatus(complaint.status);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={updateDialog.open}
        onClose={() => setUpdateDialog({ open: false, complaint: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Complaint Status</DialogTitle>
        <DialogContent>
          <Box py={2}>
            <Typography variant="h6" gutterBottom>
              {updateDialog.complaint?.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              ID: {updateDialog.complaint?.complaintId}
            </Typography>
            
            {updateDialog.complaint?.media && updateDialog.complaint.media.length > 0 && (
              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Uploaded Media:
                </Typography>
                <ImageList cols={3} rowHeight={100}>
                  {updateDialog.complaint.media.map((media, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={`${mediaURL}${media.url}`}
                        alt={`Media ${index + 1}`}
                        style={{ objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="assigned">Assigned</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                onClick={handleStatusUpdate}
              >
                Update Status
              </Button>
              <Button
                variant="outlined"
                onClick={() => setUpdateDialog({ open: false, complaint: null })}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;