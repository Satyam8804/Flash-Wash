// employeeAuthMiddleware.js
import { ApiError } from '../Utils/ApiError.js';

const employeeAuthMiddleware = (req, res, next) => {
  const user = req.user; // Assuming you set the user during authentication

  if (!user || (user.role !== 'employee' && user.role !== 'admin')) {
    throw new ApiError(403, 'Unauthorized');
  }

  // The user is authenticated and has either the 'employee' or 'admin' role
  next();
};

export { employeeAuthMiddleware };
