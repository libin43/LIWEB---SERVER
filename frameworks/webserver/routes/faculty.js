import facultyController from '../../../adapters/controllers/facultyController.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import academicYearRepository from '../../../application/repositories/academicYearRepository.js';
import academicYearRepositoryMongoDB from '../../database/mongoDB/repositories/academicYearRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default function facultyRouter(express) {
  const router = express.Router();

  const controller = facultyController(
    facultyRepository,
    facultyRepositoryMongoDB,
    academicYearRepository,
    academicYearRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
  // GET endpoints

  // POST enpdpoints
  router.route('/addFaculty').post(authMiddleware, controller.addNewFaculty);
  return router;
}
