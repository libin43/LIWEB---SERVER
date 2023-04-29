import studentController from '../../../adapters/controllers/studentController.js';
import studentRepository from '../../../application/repositories/studentRepository.js';
import studentRepositoryMongoDB from '../../database/mongoDB/repositories/studentRepositoryMongoDB.js';
import classRespository from '../../../application/repositories/classRepository.js';
import classRepositoryMongoDB from '../../database/mongoDB/repositories/classRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default function studentRouter(express) {
  const router = express.Router();

  const controller = studentController(
    studentRepository,
    studentRepositoryMongoDB,
    classRespository,
    classRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
    // GET enpdpoints

  // POST enpdpoints
  router.route('/add_student').post(authMiddleware, controller.addNewStudent);
  return router;
}
