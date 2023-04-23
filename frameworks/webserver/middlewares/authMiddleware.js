import authServiceImpl from '../../services/authService.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';

export default async function authMiddleware(req, res, next) {
  // Get token from header
  let token = req.header('authorization');
  const authService = authServiceInterface(authServiceImpl());

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token, 'its token');
  }
  try {
    const decoded = await authService.verifyToken(token);
    req.schoolAdmin = decoded.id;
    next();
  } catch (error) {
    console.log(error, 'its the error ');
    next(error);
  }
}
