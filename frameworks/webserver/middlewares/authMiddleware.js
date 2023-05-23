import authServiceImpl from '../../services/authService.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';

export default async function authMiddleware(req, res, next) {
  // Get token from header
  let token = req.header('authorization');
  const authService = authServiceInterface(authServiceImpl());

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token, 'token in authorization');
  }
  try {
    const decoded = await authService.verifyToken(token);
    console.log(decoded, 'decoded');
    switch (decoded.role) {
      case 'schoolAdmin':
        req.schoolAdmin = decoded.id;
        break;
      case 'faculty':
        req.faculty = decoded.id;
        break;
      case 'student':
        req.faculty = decoded.id;
        break;
      default:
        // handle unknown role
        break;
    }
    next();
  } catch (error) {
    console.log(error, 'its the error ');
    next(error);
  }
}
