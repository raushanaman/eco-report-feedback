import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import NatureIcon from '@mui/icons-material/Nature';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  console.log('Current user in navbar:', user);

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2e7d32, #66bb6a)' }}>
      <Toolbar>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <NatureIcon sx={{ mr: 2 }} />
        </motion.div>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            EcoReport
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleLanguage} title={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}>
            <LanguageIcon />
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {language === 'en' ? 'हिं' : 'EN'}
            </Typography>
          </IconButton>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                {t('dashboard')}
              </Button>
              {!(user.role === 'admin' || user.role === 'officer') && (
                <Button color="inherit" component={Link} to="/submit-complaint">
                  {t('submitComplaint')}
                </Button>
              )}
              {(user.role === 'admin' || user.role === 'officer') && (
                <Button color="inherit" component={Link} to="/admin">
                  {t('adminDashboard')}
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                {t('logout')} ({user.name})
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                {t('login')}
              </Button>
              <Button color="inherit" component={Link} to="/register">
                {t('register')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;