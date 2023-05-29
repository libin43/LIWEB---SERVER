import facultyController from '../../../adapters/controllers/facultyController.js';
import facultyRepository from '../../../application/repositories/facultyRepository.js';
import facultyRepositoryMongoDB from '../../database/mongoDB/repositories/facultyRepositoryMongoDB.js';
import subjectRepository from '../../../application/repositories/subjectRepository.js';
import subjectRepositoryMongoDB from '../../database/mongoDB/repositories/subjectRepositoryMongoDB.js';
import examRepository from '../../../application/repositories/examRepository.js';
import examRepositoryMongoDB from '../../database/mongoDB/repositories/examRepositoryMongoDB.js';
import classRespository from '../../../application/repositories/classRepository.js';
import classRepositoryMongoDB from '../../database/mongoDB/repositories/classRepositoryMongoDB.js';
import academicYearRepository from '../../../application/repositories/academicYearRepository.js';
import academicYearRepositoryMongoDB from '../../database/mongoDB/repositories/academicYearRepositoryMongoDB.js';
import examResultRepository from '../../../application/repositories/examResultRepository.js';
import examResultsRepositoryMongoDB from '../../database/mongoDB/repositories/examResultsRepositoryMongoDB.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import storageServiceS3Interface from '../../../application/services/storageServiceInterface.js';
import storageServiceS3 from '../../services/storageService.js';
import imageResizeServiceInterface from '../../../application/services/imageResizeServiceInterface.js';
import imageResizeService from '../../services/imageResizeService.js';
import cloudfrontServiceInterface from '../../../application/services/cloudfrontServiceInterface.js';
import cloudfrontService from '../../services/cloudfrontService.js';

export default function facultyRouter(express) {
  const router = express.Router();

  const controller = facultyController(
    facultyRepository,
    facultyRepositoryMongoDB,
    subjectRepository,
    subjectRepositoryMongoDB,
    examRepository,
    examRepositoryMongoDB,
    classRespository,
    classRepositoryMongoDB,
    academicYearRepository,
    academicYearRepositoryMongoDB,
    examResultRepository,
    examResultsRepositoryMongoDB,
    imageResizeServiceInterface,
    imageResizeService,
    storageServiceS3Interface,
    storageServiceS3,
    cloudfrontServiceInterface,
    cloudfrontService,
    authServiceInterface,
    authServiceImpl,
  );
  // GET endpoints
  router.route('/get_info').get(authMiddleware, controller.facultyInfo);
  router.route('/get_academic_year').get(authMiddleware, controller.facultyGetAcademicYear);
  router.route('/exam_schedule/:id').get(authMiddleware, controller.facultyGetScheduledExams);
  router.route('/get_exam_conducted_classes/:id').get(authMiddleware, controller.facultyGetExamConductedClasses);
  router.route('/students_in_class/students').get(authMiddleware, controller.facutlyGetStudentsInClass);
  router.route('/class_view_incharge/:id').get(authMiddleware, controller.facultyGetClassInCharge);
  router.route('/class_student_overall_exam_result/:id').get(authMiddleware, controller.facultyGetOverallStudentResult);
  router.route('/get_class_room/:id').get(authMiddleware, controller.facultyGetClassesByYear);
  router.route('/dashboard_statistics/:id').get(authMiddleware, controller.facultyStatistics);

  // POST enpdpoints
  router.route('/addFaculty').post(authMiddleware, controller.addNewFaculty);
  router.route('/submit_exam_result').post(authMiddleware, controller.submitExamResult);

  // PUT endpoints
  router.route('/initiate_student_promotion').put(authMiddleware, controller.promoteStudents);

  // PATCH endpoints
  router.route('/upload_pro_pic').patch(authMiddleware, upload.single('facultyImage'), controller.uploadProfilePicture);
  router.route('/update_profile').patch(authMiddleware, controller.facultyUpdateProfile);

  // DELETE endpoints
  router.route('/remove_pro_pic/:fileName').delete(authMiddleware, controller.removeImage);

  return router;
}
