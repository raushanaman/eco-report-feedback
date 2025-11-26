import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import ReportIcon from '@mui/icons-material/Report';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const DashboardStats = ({ complaints }) => {
  const stats = [
    {
      title: 'Total Complaints',
      value: complaints.length,
      icon: <ReportIcon sx={{ fontSize: 30 }} />,
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
      bgColor: 'rgba(33, 150, 243, 0.1)'
    },
    {
      title: 'Pending',
      value: complaints.filter(c => c.status === 'pending').length,
      icon: <PendingIcon sx={{ fontSize: 30 }} />,
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      bgColor: 'rgba(255, 152, 0, 0.1)'
    },
    {
      title: 'Resolved',
      value: complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length,
      icon: <CheckCircleIcon sx={{ fontSize: 30 }} />,
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      bgColor: 'rgba(76, 175, 80, 0.1)'
    },
    {
      title: 'Success Rate',
      value: complaints.length > 0 ? 
        `${Math.round((complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length / complaints.length) * 100)}%` : '0%',
      icon: <TrendingUpIcon sx={{ fontSize: 30 }} />,
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
      bgColor: 'rgba(156, 39, 176, 0.1)'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card
              sx={{
                height: '100%',
                background: stat.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: `0 10px 30px ${stat.color}40`,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      width: 56,
                      height: 56
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
              
              {/* Decorative background pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  zIndex: 1
                }}
              />
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;