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

// Submit feedback
router.post('/:complaintId/feedback', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const complaint = await Complaint.findOne({ 
      complaintId: req.params.complaintId,
      userId: req.userId 
    });
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };
    
    await complaint.save();
    
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;