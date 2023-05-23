import authController from '../../../adapters/controllers/authController.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';

export default function authRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    schoolAdminRepostiory,
    schoolAdminRepositoryMongoDB,
    facultyRepository,
    facultyRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );

  // POST enpdpoints
  router.route('/school_admin/login').post(controller.loginSchoolAdmin);
  router.route('/faculty/login').post(controller.loginFaculty);

  return router;
}
