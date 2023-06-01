import addFaculty from '../../application/use_cases/faculty/add.js';
import addExamResult from '../../application/use_cases/faculty/addExamResult.js';
import addProfilePicture from '../../application/use_cases/faculty/addProfilePicture.js';
import deleteProfilePicture from '../../application/use_cases/faculty/deleteProfilePicture.js';
import getAcademicYearInFaculty from '../../application/use_cases/faculty/getAcademicYearInFaculty.js';
import getClassesByAcademicYearId from '../../application/use_cases/faculty/getClassesByAcademicYearId.js';
import getClassesBySubjectId from '../../application/use_cases/faculty/getClassesBySubjectId.js';
import getExam from '../../application/use_cases/faculty/getExam.js';
import getFacultyInfo from '../../application/use_cases/faculty/getFacultyInfo.js';
import getInChargeClasses from '../../application/use_cases/faculty/getInChargeClasses.js';
import getScheduledExamsInFaculty from '../../application/use_cases/faculty/getScheduledExamsInFaculty.js';
import getStatistics from '../../application/use_cases/faculty/getStatistics.js';
import getStudentOverallExamResult from '../../application/use_cases/faculty/getStudentOverallExamResult.js';
import getSubject from '../../application/use_cases/faculty/getSubject.js';
import getSubjectExamMarks from '../../application/use_cases/faculty/getSubjectExamMarks.js';
import getStudents from '../../application/use_cases/faculty/getSudents.js';
import moveStudents from '../../application/use_cases/faculty/moveStudents.js';
import updateFacultyProfile from '../../application/use_cases/faculty/updateFacultyProfile.js';

export default function facultyController(
  facultyRepository,
  facultyRepositoryImpl,
  subjectRepository,
  subjectRepositoryImpl,
  examRepository,
  examRepositoryImpl,
  classRepository,
  classRepositoryImpl,
  academicYearRepository,
  academicYearImpl,
  examResultRepository,
  examResultImpl,
  imageResizeServiceInterface,
  imageResizeServiceImpl,
  storageServiceS3Interface,
  storageServiceS3Impl,
  cloudfrontServiceInterface,
  cloudfrontServiceImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositoryFaculty = facultyRepository(facultyRepositoryImpl());
  const dbRepositorySubject = subjectRepository(subjectRepositoryImpl());
  const dbRepositoryClass = classRepository(classRepositoryImpl());
  const dbRepositoryExam = examRepository(examRepositoryImpl());
  const dbRepositoryAcademicYear = academicYearRepository(academicYearImpl());
  const dbRepositoryExamResult = examResultRepository(examResultImpl());
  const imageResizeService = imageResizeServiceInterface(imageResizeServiceImpl());
  const s3Service = storageServiceS3Interface(storageServiceS3Impl());
  const cloudfrontService = cloudfrontServiceInterface(cloudfrontServiceImpl());
  const authService = authServiceInterface(authServiceImpl());
  const addNewFaculty = async (req, res, next) => {
    try {
      console.log(req.body, 'reached in faculty controller');
      const {
        facultyName,
        email,
        phone,
        dateOfBirth,
        academicYearID,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addFaculty(
        facultyName,
        email,
        phone,
        dateOfBirth,
        academicYearID,
        schoolId,
        dbRepositoryFaculty,
        authService,
      )
        .then((faculty) => res.status(200).json({ success: true, message: 'Faculty added successfully', faculty }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyInfo = async (req, res, next) => {
    try {
      const facultyId = req.faculty;
      getFacultyInfo(
        facultyId,
        dbRepositoryFaculty,
        s3Service,
        cloudfrontService,
      )
        .then((faculty) => res.status(200).json({ success: true, message: 'Faculty info fetched successfully', faculty }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetAcademicYear = async (req, res, next) => {
    try {
      const facultyId = req.faculty;
      getAcademicYearInFaculty(
        facultyId,
        dbRepositoryFaculty,
        dbRepositoryAcademicYear,
      )
        .then((academicYear) => res.status(200).json({ success: true, message: 'Academic year fetched successfully', academicYear }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetScheduledExams = async (req, res, next) => {
    try {
      const academicYearID = req.params.id;
      const facultyId = req.faculty;
      console.log(academicYearID, facultyId);
      getScheduledExamsInFaculty(
        facultyId,
        academicYearID,
        dbRepositorySubject,
      )
        .then((subjects) => res.status(200).json({ success: true, message: 'Examinations of subjects fetched successfully', subjects }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetExamConductedClasses = async (req, res, next) => {
    try {
      console.log(req.query);
      const { examId, subjectId } = req.query;
      console.log(subjectId, examId, 'kalfdjasj');
      getClassesBySubjectId(
        subjectId,
        examId,
        dbRepositoryClass,
        dbRepositoryExamResult,
      )
        .then((classes) => res.status(200).json({ success: true, message: 'Examination conducted classes fetched successfully', classes }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facutlyGetStudentsInClass = async (req, res, next) => {
    try {
      const { classId, subjectId, examId } = req.query;
      Promise.all([
        getSubject(subjectId, dbRepositorySubject),
        getExam(examId, dbRepositoryExam),
        getStudents(classId, dbRepositoryClass),
      ])
        .then(([subjectData, examData, studentsData]) => res.status(200).json({
          success: true, message: 'Students fetched successfully', subjectData, examData, studentsData,
        }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const submitExamResult = async (req, res, next) => {
    console.log(req.body, 'in submit exam');
    try {
      const {
        classID,
        subjectID,
        examID,
        totalMark,
        resultSheet,
      } = req.body;
      console.log(resultSheet);
      addExamResult(
        classID,
        subjectID,
        examID,
        totalMark,
        resultSheet,
        dbRepositoryExamResult,
      )
        .then((examResult) => res.status(200).json({ success: true, message: 'Marks submitted successfully', examResult }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetClassInCharge = async (req, res, next) => {
    try {
      const academicYearID = req.params.id;
      const facultyID = req.faculty;
      console.log(academicYearID, facultyID);
      getInChargeClasses(
        facultyID,
        academicYearID,
        dbRepositoryClass,
      )
        .then((inChargeClasses) => res.status(200).json({ success: true, message: 'Classes in charge fetched successfully', inChargeClasses }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetOverallStudentResult = async (req, res, next) => {
    try {
      const classID = req.params.id;
      const facultyID = req.faculty;
      console.log(classID, facultyID);
      getStudentOverallExamResult(
        classID,
        facultyID,
        dbRepositoryClass,
      )
        .then((inChargeClasses) => res.status(200).json({ success: true, message: 'Classes in charge fetched successfully', inChargeClasses }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyGetClassesByYear = async (req, res, next) => {
    try {
      const academicYearID = req.params.id;
      const facultyID = req.faculty;
      console.log(academicYearID, facultyID);
      getClassesByAcademicYearId(
        academicYearID,
        facultyID,
        dbRepositoryClass,
        dbRepositoryFaculty,
      )
        .then((classes) => res.status(200).json({ success: true, message: 'Classes fetched successfully', classes }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const promoteStudents = async (req, res, next) => {
    try {
      const { students, currentClassID, selectedClass } = req.body;
      console.log(students, currentClassID, selectedClass);
      moveStudents(
        students,
        currentClassID,
        selectedClass,
        dbRepositoryClass,
      )
        .then((response) => res.status(200).json({ success: true, message: 'Moved to new class', response }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyStatistics = async (req, res, next) => {
    try {
      const academicYearID = req.params.id;
      const facultyID = req.faculty;
      getStatistics(
        academicYearID,
        facultyID,
        dbRepositoryFaculty,
      )
        .then((statistics) => res.status(200).json({ success: true, message: 'Faculty statistics fetched successfully', statistics }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const uploadProfilePicture = async (req, res, next) => {
    try {
      console.log('fac profile');
      console.log(req.file, 'file to come');
      const file = req.file;
      console.log(req.body, 'any body');
      const facultyID = req.faculty;
      addProfilePicture(
        facultyID,
        file,
        imageResizeService,
        s3Service,
        cloudfrontService,
        dbRepositoryFaculty,
      )
        .then((response) => res.status(200).json({ success: true, message: 'Faculty profile updated successfully', response }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const removeImage = async (req, res, next) => {
    try {
      const facultyID = req.faculty;
      const { fileName } = req.params;
      deleteProfilePicture(
        facultyID,
        fileName,
        s3Service,
        cloudfrontService,
        dbRepositoryFaculty,
      )
        .then((response) => res.status(200).json({ success: true, message: 'Faculty image removed successfully', response }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyUpdateProfile = async (req, res, next) => {
    try {
      const facultyID = req.faculty;
      const facultyData = req.body;
      console.log(facultyData, '...');
      updateFacultyProfile(
        facultyID,
        facultyData,
        dbRepositoryFaculty,
      )
        .then((response) => res.status(200).json({ success: true, message: 'Faculty profile updated successfully', response }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const facultyViewSubjectMarks = async (req, res, next) => {
    try {
      const { classId, subjectId, examId } = req.query;
      console.log(classId, subjectId, examId);

      getSubjectExamMarks(
        classId,
        subjectId,
        examId,
        dbRepositoryClass,
        dbRepositorySubject,
        dbRepositoryExam,
        dbRepositoryExamResult,
      )
        .then((response) => res.status(200).json({ success: true, message: 'Faculty subject exam fetched successfully', response }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  return {
    addNewFaculty,
    facultyInfo,
    facultyGetAcademicYear,
    facultyGetScheduledExams,
    facultyGetExamConductedClasses,
    facutlyGetStudentsInClass,
    submitExamResult,
    facultyGetClassInCharge,
    facultyGetOverallStudentResult,
    facultyGetClassesByYear,
    promoteStudents,
    facultyStatistics,
    uploadProfilePicture,
    removeImage,
    facultyUpdateProfile,
    facultyViewSubjectMarks,
  };
}
