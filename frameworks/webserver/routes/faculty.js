import facultyController from '../../../adapters/controllers/facultyController.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import authServiceImpl from '../../services/authService.js';

export default function facultyRouter(express) {
  const router = express.Router();

  const controller = facultyController(
    facultyRepository,
    facultyRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
  // POST enpdpoints
  router.route('/addFaculty').post(controller.addNewFaculty);
  return router;
}
