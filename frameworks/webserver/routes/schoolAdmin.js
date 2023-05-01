import schoolAdminController from '../../../adapters/controllers/schoolAdminController.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import academicYearRepository from '../../../application/repositories/academicYearRepository.js';
import academicYearRepositoryMongoDB from '../../database/mongoDB/repositories/academicYearRepositoryMongoDB.js';
import classRespository from '../../../application/repositories/classRepository.js';
import classRepositoryMongoDB from '../../database/mongoDB/repositories/classRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import subjectRepository from '../../../application/repositories/subjectRepository.js';
import subjectRepositoryMongoDB from '../../database/mongoDB/repositories/subjectRepositoryMongoDB.js';

export default function schoolAdminRouter(express) {
  const router = express.Router();

  const controller = schoolAdminController(
    schoolAdminRepostiory,
    schoolAdminRepositoryMongoDB,
    facultyRepository,
    facultyRepositoryMongoDB,
    academicYearRepository,
    academicYearRepositoryMongoDB,
    classRespository,
    classRepositoryMongoDB,
    subjectRepository,
    subjectRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
  // GET enpdpoints
  router.route('/getInfo').get(authMiddleware, controller.getSchoolAdminInfo);
  router.route('/get_faculty_academic_year').get(authMiddleware, controller.getFacultyNameAcademicYear);
  router.route('/get_academic_year').get(authMiddleware, controller.getAcademicYearData);

  // POST enpdpoints
  router.route('/signup').post(controller.addNewSchoolAdmin);
  router.route('/addAcademicYear').post(authMiddleware, controller.addNewAcademicYear);
  router.route('/add_class').post(authMiddleware, controller.addNewClassRoom);
  router.route('/get_class_room').post(authMiddleware, controller.getClassRoomDataByAcademicYear);
  router.route('/add_subject').post(authMiddleware, controller.addNewSubject);
  return router;
}
