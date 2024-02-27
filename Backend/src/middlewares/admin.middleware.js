// adminMiddleware.js
import { User } from '../Models/user.models.js';

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only' });
    }

    // If the user is an admin, continue with the next middleware
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);

    // Log more details about the error
    console.error(error.stack);

    res.status(500).json({ message: 'Internal server error' });
  }
};

export default isAdmin;
