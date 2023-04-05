import schoolAdminController from '../../../adapters/controllers/schoolAdminController.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';

export default function schoolAdminRouter(express) {
  const router = express.Router();

  const controller = schoolAdminController(
    schoolAdminRepostiory,
    schoolAdminRepositoryMongoDB,

  );
  // GET enpdpoints
  router.route('/').get((req, res) => {
    res.send('This is school admin');
  });
  // POST enpdpoints
  router.route('/signup').post(controller.addNewSchoolAdmin);
  return router;
}
