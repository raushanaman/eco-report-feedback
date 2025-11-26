import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NatureIcon from '@mui/icons-material/Nature';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import RecyclingIcon from '@mui/icons-material/Recycling';
import AirIcon from '@mui/icons-material/Air';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PublicIcon from '@mui/icons-material/Public';

const EnvironmentalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Enhanced environmental awareness slides with icons and better styling
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=500&fit=crop&auto=format',
      title: '🌲 Protect Our Forests',
      message: 'Every tree counts! Plant a tree today and breathe cleaner air tomorrow.',
      subtitle: 'Join the Green Revolution',
      color: '#2E7D32',
      gradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      icon: <NatureIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=1200&h=500&fit=crop&auto=format',
      title: '🌊 Save Our Oceans',
      message: 'Reduce plastic waste. Our marine life depends on clean oceans.',
      subtitle: 'Protect Marine Ecosystems',
      color: '#1976D2',
      gradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
      icon: <WaterDropIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=500&fit=crop&auto=format',
      title: '☀️ Renewable Energy',
      message: 'Solar power lights up our future. Choose clean energy for a sustainable tomorrow.',
      subtitle: 'Power the Future Sustainably',
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)',
      icon: <SolarPowerIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=500&fit=crop&auto=format',
      title: '♻️ Reduce, Reuse, Recycle',
      message: 'Small actions, big impact. Every recycled item makes a difference.',
      subtitle: 'Circular Economy Champion',
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
      icon: <RecyclingIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=500&fit=crop&auto=format',
      title: '💨 Clean Air Initiative',
      message: 'Report air pollution in your area. Together we can breathe easier.',
      subtitle: 'Breathe Pure, Live Better',
      color: '#00BCD4',
      gradient: 'linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)',
      icon: <AirIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop&auto=format',
      title: '🦎 Wildlife Conservation',
      message: 'Protect endangered species. Every creature has a role in our ecosystem.',
      subtitle: 'Preserve Biodiversity',
      color: '#795548',
      gradient: 'linear-gradient(135deg, #795548 0%, #8D6E63 100%)',
      icon: <PetsIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=1200&h=500&fit=crop&auto=format',
      title: '💧 Water Conservation',
      message: 'Every drop matters. Save water today for future generations.',
      subtitle: 'Preserve Our Most Precious Resource',
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)',
      icon: <WaterDropIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=500&fit=crop&auto=format',
      title: '🚴 Green Transportation',
      message: 'Choose eco-friendly transport. Reduce emissions, increase health.',
      subtitle: 'Move Green, Stay Healthy',
      color: '#8BC34A',
      gradient: 'linear-gradient(135deg, #8BC34A 0%, #9CCC65 100%)',
      icon: <DirectionsBikeIcon sx={{ fontSize: 40 }} />
    },
    {
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&h=500&fit=crop&auto=format',
      title: '🌍 Earth Day Every Day',
      message: 'Make every day Earth Day. Small changes create lasting impact.',
      subtitle: 'Be the Change You Want to See',
      color: '#388E3C',
      gradient: 'linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)',
      icon: <PublicIcon sx={{ fontSize: 40 }} />
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(timer);
    }
  }, [slides.length, isPaused]);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        height: { xs: 250, md: 350 }, 
        borderRadius: 3, 
        overflow: 'hidden',
        mb: 4,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardMedia
              component="img"
              height="350"
              image={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              sx={{ 
                objectFit: 'cover',
                filter: 'brightness(0.6)',
                transition: 'all 0.8s ease',
                transform: 'scale(1.05)'
              }}
            />
            
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${slides[currentSlide].color}AA 0%, transparent 50%, ${slides[currentSlide].color}66 100%)`,
              }}
            />
            
            {/* Top Icon Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                p: 1.5,
                color: slides[currentSlide].color
              }}
            >
              {slides[currentSlide].icon}
            </Box>
            
            {/* Main Content */}
            <CardContent
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: slides[currentSlide].gradient,
                color: 'white',
                textAlign: 'center',
                py: 4,
                px: 3
              }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Chip 
                  label={slides[currentSlide].subtitle}
                  sx={{ 
                    mb: 2, 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  {slides[currentSlide].title}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="p"
                  sx={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    maxWidth: '85%',
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 500,
                    opacity: 0.95
                  }}
                >
                  {slides[currentSlide].message}
                </Typography>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Slide indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          gap: 1.5,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 3,
          p: 1
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: index === currentSlide ? 24 : 12,
              height: 12,
              borderRadius: 2,
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.8)',
                transform: 'scale(1.1)'
              }
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>

      {/* Enhanced Progress bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 6,
          background: slides[currentSlide].gradient,
          animation: isPaused ? 'none' : 'progress 4s linear infinite',
          borderRadius: '0 0 12px 12px',
          '@keyframes progress': {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
          }
        }}
      />
      
      {/* Slide counter */}
      <Chip
        label={`${currentSlide + 1} / ${slides.length}`}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          fontWeight: 'bold'
        }}
      />
    </Box>
  );
};

export default EnvironmentalSlider;