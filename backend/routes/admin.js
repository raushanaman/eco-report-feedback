const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all complaints (admin/officer)
router.get('/complaints', auth, adminAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'name email phone')
      .populate('assignedOfficer', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign complaint to officer
router.put('/complaints/:id/assign', auth, adminAuth, async (req, res) => {
  try {
    const { officerId } = req.body;
    
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.assignedOfficer = officerId;
    complaint.status = 'assigned';
    
    await complaint.save();
    
    res.json({ message: 'Complaint assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status
router.put('/complaints/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status, resolutionProof } = req.body;
    
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    // Allow closing - user feedback will be requested after closing
    
    complaint.status = status;
    if (status === 'resolved') {
      complaint.resolvedAt = new Date();
      if (resolutionProof) {
        complaint.resolutionProof = resolutionProof;
      }
    }
    
    await complaint.save();
    
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'resolved' });
    const overdueComplaints = await Complaint.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $nin: ['resolved', 'closed'] }
    });
    
    res.json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      overdueComplaints
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;