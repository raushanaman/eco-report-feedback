const express = require('express');
const multer = require('multer');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

const router = express.Router();

// Simple file storage without Cloudinary for now
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'));
    }
  }
});

const generateComplaintId = () => {
  return 'CMP' + Date.now() + Math.floor(Math.random() * 1000);
};

// Submit complaint
router.post('/submit', auth, upload.array('media', 5), async (req, res) => {
  try {
    const { title, description, category, address, lat, lng } = req.body;
    
    console.log('Received complaint data:', { title, description, category, address, lat, lng });
    console.log('Files:', req.files);
    
    const mediaFiles = [];
    
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        mediaFiles.push({
          type: file.mimetype.startsWith('video') ? 'video' : 'image',
          url: `/uploads/${file.filename}`,
          publicId: file.filename
        });
      });
    }
    
    const complaint = new Complaint({
      complaintId: generateComplaintId(),
      userId: req.userId,
      title,
      description,
      category,
      location: {
        address,
        coordinates: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined
      },
      media: mediaFiles
    });
    
    await complaint.save();
    console.log('Complaint saved:', complaint.complaintId);
    
    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaintId: complaint.complaintId
    });
  } catch (error) {
    console.error('Submit complaint error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get user complaints
router.get('/my-complaints', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit mandatory user feedback for closed complaints
router.post('/:complaintId/user-feedback', auth, async (req, res) => {
  try {
    console.log('User feedback submission request:', {
      complaintId: req.params.complaintId,
      userId: req.userId,
      body: req.body
    });
    
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      console.log('Missing rating or comment');
      return res.status(400).json({ message: 'Rating and comment are required' });
    }
    
    const complaint = await Complaint.findOne({ 
      complaintId: req.params.complaintId,
      userId: req.userId 
    });
    
    console.log('Found complaint:', complaint ? complaint.complaintId : 'Not found');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    console.log('Complaint status:', complaint.status);
    
    if (complaint.status !== 'closed') {
      return res.status(400).json({ message: 'Feedback can only be submitted for closed complaints' });
    }
    
    complaint.userFeedback = {
      rating,
      comment,
      submittedAt: new Date()
    };
    
    await complaint.save();
    console.log('User feedback saved successfully');
    
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Submit user feedback error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Submit feedback (old route - keeping for compatibility)
router.post('/:complaintId/feedback', auth, async (req, res) => {
  try {
    console.log('Regular feedback submission request:', {
      complaintId: req.params.complaintId,
      userId: req.userId,
      body: req.body
    });
    
    const { rating, comment } = req.body;
    
    const complaint = await Complaint.findOne({ 
      complaintId: req.params.complaintId,
      userId: req.userId 
    });
    
    console.log('Found complaint for regular feedback:', complaint ? complaint.complaintId : 'Not found');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };
    
    await complaint.save();
    console.log('Regular feedback saved successfully');
    
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Test route to set complaint status to closed (for testing feedback)
router.put('/:complaintId/test-close', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ 
      complaintId: req.params.complaintId,
      userId: req.userId 
    });
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.status = 'closed';
    await complaint.save();
    
    res.json({ message: 'Complaint status set to closed for testing' });
  } catch (error) {
    console.error('Test close error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;