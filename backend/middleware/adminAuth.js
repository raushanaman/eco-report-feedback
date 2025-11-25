const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    console.log('Admin auth check for user:', user?.email, 'role:', user?.role);
    
    if (!user || (user.role !== 'admin' && user.role !== 'officer')) {
      return res.status(403).json({ message: 'Access denied. Admin or officer role required.' });
    }
    
    req.userRole = user.role;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};