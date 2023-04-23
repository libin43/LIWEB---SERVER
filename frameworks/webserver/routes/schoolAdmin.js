import schoolAdminController from '../../../adapters/controllers/schoolAdminController.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';
import academicYearRepository from '../../../application/repositories/academicYearRepository.js';
import academicYearRepositoryMongoDB from '../../database/mongoDB/repositories/academicYearRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default function schoolAdminRouter(express) {
  const router = express.Router();

  const controller = schoolAdminController(
    schoolAdminRepostiory,
    schoolAdminRepositoryMongoDB,
    academicYearRepository,
    academicYearRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
  // GET enpdpoints
  router.route('/getInfo').get(authMiddleware, controller.getSchoolAdminInfo);
  // POST enpdpoints
  router.route('/signup').post(controller.addNewSchoolAdmin);
  router.route('/addAcademicYear').post(authMiddleware, controller.addNewAcademicYear);
  return router;
}
