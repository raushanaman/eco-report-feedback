import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Chip, Button,
  Dialog, DialogTitle, DialogContent, Rating, TextField, Box, Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { complaintService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    complaintId: ''
  });
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    comment: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getMyComplaints();
      setComplaints(data);
    } catch (err) {
      setError('Failed to fetch complaints');
    } finally {
      setLoading(false);
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

  const handleFeedbackSubmit = async () => {
    try {
      await complaintService.submitFeedback(
        feedbackDialog.complaintId,
        feedbackData.rating,
        feedbackData.comment
      );
      setSuccess('Feedback submitted successfully!');
      setFeedbackDialog({ open: false, complaintId: '' });
      setFeedbackData({ rating: 0, comment: '' });
      fetchComplaints();
    } catch (err) {
      setError('Failed to submit feedback');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom className="gradient-text">
        Welcome back, {user?.name}!
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Your Complaints ({complaints.length})
      </Typography>

      <Grid container spacing={3}>
        {complaints.map((complaint, index) => (
          <Grid item xs={12} md={6} lg={4} key={complaint._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {complaint.title}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    ID: {complaint.complaintId}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {complaint.description.substring(0, 100)}...
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip
                      label={complaint.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(complaint.status)}
                      size="small"
                    />
                    <Chip
                      label={complaint.category.replace('_', ' ')}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="caption" display="block" gutterBottom>
                    Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                  </Typography>
                  
                  {complaint.resolvedAt && (
                    <Typography variant="caption" display="block" gutterBottom>
                      Resolved: {new Date(complaint.resolvedAt).toLocaleDateString()}
                    </Typography>
                  )}
                  
                  {complaint.status === 'resolved' && !complaint.feedback && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setFeedbackDialog({
                        open: true,
                        complaintId: complaint.complaintId
                      })}
                      sx={{ mt: 1 }}
                    >
                      Provide Feedback
                    </Button>
                  )}
                  
                  {complaint.feedback && (
                    <Box mt={1}>
                      <Typography variant="caption" display="block">
                        Your Rating:
                      </Typography>
                      <Rating value={complaint.feedback.rating} readOnly size="small" />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {complaints.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            No complaints submitted yet
          </Typography>
          <Button variant="contained" href="/submit-complaint" sx={{ mt: 2 }}>
            Submit Your First Complaint
          </Button>
        </Box>
      )}

      <Dialog
        open={feedbackDialog.open}
        onClose={() => setFeedbackDialog({ open: false, complaintId: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <Box py={2}>
            <Typography component="legend">Rate the resolution:</Typography>
            <Rating
              value={feedbackData.rating}
              onChange={(_, newValue) => setFeedbackData({
                ...feedbackData,
                rating: newValue || 0
              })}
            />
            
            <TextField
              fullWidth
              label="Additional Comments"
              multiline
              rows={4}
              value={feedbackData.comment}
              onChange={(e) => setFeedbackData({
                ...feedbackData,
                comment: e.target.value
              })}
              margin="normal"
            />
            
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                onClick={handleFeedbackSubmit}
                disabled={feedbackData.rating === 0}
              >
                Submit Feedback
              </Button>
              <Button
                variant="outlined"
                onClick={() => setFeedbackDialog({ open: false, complaintId: '' })}
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

export default Dashboard;