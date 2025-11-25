import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Chip, Button,
  Dialog, DialogTitle, DialogContent, Rating, TextField, Box, Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { complaintService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();

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
      setError('');
      setSuccess('');
      
      // Check if this is for a closed complaint (mandatory feedback)
      const complaint = complaints.find(c => c.complaintId === feedbackDialog.complaintId);
      console.log('Submitting feedback for complaint:', complaint);
      console.log('Feedback data:', feedbackData);
      
      if (complaint?.status === 'closed') {
        console.log('Submitting user feedback for closed complaint');
        await complaintService.submitUserFeedback(
          feedbackDialog.complaintId,
          feedbackData.rating,
          feedbackData.comment
        );
      } else {
        console.log('Submitting regular feedback');
        await complaintService.submitFeedback(
          feedbackDialog.complaintId,
          feedbackData.rating,
          feedbackData.comment
        );
      }
      
      setSuccess(t('feedbackSubmittedSuccess'));
      setFeedbackDialog({ open: false, complaintId: '' });
      setFeedbackData({ rating: 0, comment: '' });
      fetchComplaints();
    } catch (err) {
      console.error('Feedback submission error:', err);
      setError(err.response?.data?.message || t('failedToSubmitFeedback'));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom className="gradient-text">
        {t('welcomeBack')}, {user?.name}!
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        {t('yourComplaints')} ({complaints.length})
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
                  
                  {complaint.status === 'closed' && !complaint.userFeedback && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        Feedback Required!
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        onClick={() => setFeedbackDialog({
                          open: true,
                          complaintId: complaint.complaintId
                        })}
                        sx={{ mt: 1 }}
                      >
                        Provide Mandatory Feedback
                      </Button>
                    </Alert>
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
                  
                  {complaint.userFeedback && (
                    <Box mt={1}>
                      <Typography variant="caption" display="block" color="success.main">
                        Feedback Submitted:
                      </Typography>
                      <Rating value={complaint.userFeedback.rating} readOnly size="small" />
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        "{complaint.userFeedback.comment}"
                      </Typography>
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
              label={complaints.find(c => c.complaintId === feedbackDialog.complaintId)?.status === 'closed' 
                ? "Comments (Required)" : "Additional Comments"}
              multiline
              rows={4}
              value={feedbackData.comment}
              onChange={(e) => setFeedbackData({
                ...feedbackData,
                comment: e.target.value
              })}
              margin="normal"
              required={complaints.find(c => c.complaintId === feedbackDialog.complaintId)?.status === 'closed'}
            />
            
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                onClick={handleFeedbackSubmit}
                disabled={feedbackData.rating === 0 || 
                  (complaints.find(c => c.complaintId === feedbackDialog.complaintId)?.status === 'closed' && 
                   !feedbackData.comment.trim())}
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