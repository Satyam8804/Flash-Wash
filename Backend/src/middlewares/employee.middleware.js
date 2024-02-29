// employeeAuthMiddleware.js
import { ApiError } from '../Utils/ApiError.js';

const employeeAuthMiddleware = (req, res, next) => {
  const user = req.user; 

  if (!user || (user.role !== 'employee' && user.role !== 'admin')) {
    throw new ApiError(403, 'Unauthorized');
  }

  next();
};

export { employeeAuthMiddleware };
