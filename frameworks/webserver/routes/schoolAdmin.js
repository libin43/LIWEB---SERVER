import schoolAdminController from '../../../adapters/controllers/schoolAdminController.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import academicYearRepository from '../../../application/repositories/academicYearRepository.js';
import academicYearRepositoryMongoDB from '../../database/mongoDB/repositories/academicYearRepositoryMongoDB.js';
import classRespository from '../../../application/repositories/classRepository.js';
import classRepositoryMongoDB from '../../database/mongoDB/repositories/classRepositoryMongoDB.js';
import subjectRepository from '../../../application/repositories/subjectRepository.js';
import subjectRepositoryMongoDB from '../../database/mongoDB/repositories/subjectRepositoryMongoDB.js';
import examRepository from '../../../application/repositories/examRepository.js';
import examRepositoryMongoDB from '../../database/mongoDB/repositories/examRepositoryMongoDB.js';
import studentRepository from '../../../application/repositories/studentRepository.js';
import studentRepositoryMongoDB from '../../database/mongoDB/repositories/studentRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

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
    examRepository,
    examRepositoryMongoDB,
    studentRepository,
    studentRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
  );
  // GET enpdpoints
  router.route('/getInfo').get(authMiddleware, controller.getSchoolAdminInfo);
  router.route('/get_faculty_academic_year').get(authMiddleware, controller.getFacultyNameAcademicYear);
  router.route('/get_academic_year').get(authMiddleware, controller.getAcademicYearData);
  router.route('/get_class_room/:id').get(authMiddleware, controller.getClassRoomDataByAcademicYear);
  router.route('/get_subject/:id').get(authMiddleware, controller.getSubjectDataByAcademicYear);
  router.route('/get_students/pagination').get(authMiddleware, controller.getStudents);
  router.route('/get_students/search_pagination').get(authMiddleware, controller.getStudentsBySearch);
  router.route('/get_class_subjects/pagination').get(authMiddleware, controller.getSubjects);
  router.route('/get_subjects/search_pagination').get(authMiddleware, controller.getSubjects);
  router.route('/get_subjects/search_pagination').get(authMiddleware, controller.getSubjects);
  router.route('/dashboard_statistics').get(authMiddleware, controller.getStatistics);
  router.route('/dashboard_admission_graph/page').get(authMiddleware, controller.getAdmissionGraph);

  // POST enpdpoints
  router.route('/signup').post(controller.addNewSchoolAdmin);
  router.route('/addAcademicYear').post(authMiddleware, controller.addNewAcademicYear);
  router.route('/add_class').post(authMiddleware, controller.addNewClassRoom);
  router.route('/add_subject').post(authMiddleware, controller.addNewSubject);
  router.route('/add_exam').post(authMiddleware, controller.addNewExam);

  // PATCH endpoints
  router.route('/access_control_student').patch(controller.modifyStudentAccessControl);
  return router;
}
