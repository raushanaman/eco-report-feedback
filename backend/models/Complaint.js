const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['road_damage', 'tree_maintenance', 'infrastructure', 'other'], 
    required: true 
  },
  location: {
    address: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  media: [{
    type: { type: String, enum: ['image', 'video'] },
    url: String,
    publicId: String
  }],
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'in_progress', 'resolved', 'closed'], 
    default: 'pending' 
  },
  assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolutionProof: [{
    type: String,
    url: String
  }],
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    submittedAt: Date
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  dueDate: { type: Date, default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }
});

module.exports = mongoose.model('Complaint', complaintSchema);