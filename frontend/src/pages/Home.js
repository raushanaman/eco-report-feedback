import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReportIcon from '@mui/icons-material/Report';
import NatureIcon from '@mui/icons-material/Nature';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" component="h1" gutterBottom className="floating-animation">
              Save Our Environment
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Report local environmental issues and help make your community better
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/submit-complaint"
                className="pulse-animation"
                sx={{ mr: 2, mb: 2 }}
              >
                Report an Issue
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/register"
                sx={{ color: 'white', borderColor: 'white', mb: 2 }}
              >
                Join Us
              </Button>
            </Box>
          </motion.div>
        </Container>
      </div>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom className="gradient-text">
          How It Works
        </Typography>
        
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <ReportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Report Issues
                  </Typography>
                  <Typography variant="body1">
                    Upload photos/videos of environmental problems in your area with location details
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <GroupIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Government Action
                  </Typography>
                  <Typography variant="body1">
                    Your complaint goes directly to government officials for immediate attention
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <NatureIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Track Progress
                  </Typography>
                  <Typography variant="body1">
                    Get updates on resolution progress and provide feedback on completed work
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Box className="nature-bg" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" className="glass-effect" sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
              Together We Can Make a Difference
            </Typography>
            <Typography variant="h6" component="p" gutterBottom sx={{ color: 'white', mb: 4 }}>
              Join thousands of citizens working to improve our environment
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register"
              sx={{ mr: 2 }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;