import addAcademicYear from '../../application/use_cases/academicYear/addAcademicYear.js';
import getAcademicYear from '../../application/use_cases/academicYear/getAcademicYear.js';
import addClass from '../../application/use_cases/schoolAdmin/addClass.js';
import getClassById from '../../application/use_cases/schoolAdmin/getClassById.js';
import getName from '../../application/use_cases/faculty/getName.js';
import findById from '../../application/use_cases/schoolAdmin/findById.js';
import addSchoolAdmin from '../../application/use_cases/schoolAdmin/signup.js';
import addSubject from '../../application/use_cases/schoolAdmin/addSubject.js';
import addSubjectToClasses from '../../application/use_cases/schoolAdmin/addSubjectToClasses.js';
import getSubjectById from '../../application/use_cases/schoolAdmin/getSubjectById.js';
import addExam from '../../application/use_cases/schoolAdmin/addExam.js';
import getAllStudentsById from '../../application/use_cases/schoolAdmin/getAllStudentsById.js';
import editStudentAccess from '../../application/use_cases/schoolAdmin/editStudentAccess.js';
import getAllSubjectsById from '../../application/use_cases/schoolAdmin/getAllSubjectsById.js';
import getAllStatistics from '../../application/use_cases/schoolAdmin/getAllStatistics.js';
import getYearlyAdmissions from '../../application/use_cases/schoolAdmin/getYearlyAdmissions.js';

export default function schoolAdminController(
  schoolAdminRepository,
  schoolAdminImpl,
  facultyRepository,
  facultyImpl,
  academicYearRepository,
  academicYearImpl,
  classRepository,
  classImpl,
  subjectRepository,
  subjectImpl,
  examRepository,
  examImpl,
  studentRepository,
  studentImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositorySchoolAdmin = schoolAdminRepository(schoolAdminImpl());
  const dbRepositoryFaculty = facultyRepository(facultyImpl());
  const dbRepositoryAcademicYear = academicYearRepository(academicYearImpl());
  const dbRepositoryClass = classRepository(classImpl());
  const dbRepositorySubject = subjectRepository(subjectImpl());
  const dbRepositoryExam = examRepository(examImpl());
  const dbRepositoryStudent = studentRepository(studentImpl());
  const authService = authServiceInterface(authServiceImpl());
  const addNewSchoolAdmin = async (req, res, next) => {
    try {
      console.log(req.body, 'its body');
      const {
        adminName,
        schoolName,
        afflNumber,
        email,
        phone,
        address,
        pincode,
        schoolImage,
        password,
        createdAt,
        updatedAt,
      } = req.body;
      addSchoolAdmin(
        adminName,
        schoolName,
        afflNumber,
        email,
        phone,
        address,
        pincode,
        schoolImage,
        password,
        createdAt,
        updatedAt,
        dbRepositorySchoolAdmin,
        authService,
      )
        .then((schoolAdmin) => res.status(200).json({ success: true, message: 'School admin signup successful', schoolAdmin }))
        .catch((err) => next(err));
    } catch (error) {
      console.log('Its catch', error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const addNewAcademicYear = async (req, res, next) => {
    try {
      console.log(req.body);
      const {
        startDate,
        endDate,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addAcademicYear(
        startDate,
        endDate,
        schoolId,
        dbRepositoryAcademicYear,
        dbRepositorySchoolAdmin,
      )
        .then((academicYear) => res.status(200).json({ success: true, message: 'Academic year added succesfully', academicYear }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getSchoolAdminInfo = async (req, res, next) => {
    try {
      console.log('HITTING IN GET ADMIN INFO');
      findById(
        req.schoolAdmin,
        dbRepositorySchoolAdmin,
      )
        .then((data) => res.status(200).json({ success: true, message: 'School admin fetched successfully', data }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getFacultyNameAcademicYear = async (req, res, next) => {
    console.log('htiing in getFacultyNameAcademicYear');
    try {
      const schoolId = req.schoolAdmin;
      Promise.all([
        getName(schoolId, dbRepositoryFaculty),
        getAcademicYear(schoolId, dbRepositoryAcademicYear),
      ]).then(([facultyName, academicYear]) => res.status(200).json({
        success: true, message: 'Faculty name and academic year fetched successfully', facultyName, academicYear,
      }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getAcademicYearData = async (req, res, next) => {
    try {
      const schoolId = req.schoolAdmin;
      getAcademicYear(
        schoolId,
        dbRepositoryAcademicYear,
      )
        .then((academicYear) => res.status(200).json({ success: true, message: 'School admin fetched successfully', academicYear }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewClassRoom = async (req, res, next) => {
    try {
      console.log('hitting in add new class');
      const {
        className,
        academicYearID,
        facultyID,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addClass(
        className,
        academicYearID,
        facultyID,
        schoolId,
        dbRepositoryClass,
      )
        .then((classRoom) => res.status(200).json({ success: true, message: 'Class room added succesfully', classRoom }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getClassRoomDataByAcademicYear = async (req, res, next) => {
    console.log('hit in get classroom');
    try {
      const academicYearID = req.params.id;
      console.log(academicYearID);
      const schoolId = req.schoolAdmin;
      getClassById(
        academicYearID,
        schoolId,
        dbRepositoryClass,
      )
        .then((classRoom) => res.status(200).json({ success: true, message: 'Class room fetched succesfully', classRoom }))
        .catch((err) => next(err));
      console.log(academicYearID);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewSubject = async (req, res, next) => {
    console.log('subject');
    try {
      console.log(req.body, 'req got in ad');
      const {
        subjectName,
        subjectCode,
        academicYearID,
        facultyID,
        selectedClass,
      } = req.body;
      const schoolId = req.schoolAdmin;
      console.log(selectedClass, subjectCode);
      addSubject(
        selectedClass,
        subjectName,
        subjectCode,
        academicYearID,
        facultyID,
        schoolId,
        dbRepositorySubject,
        dbRepositoryClass,
      )
        .then((
          subject,
        ) => addSubjectToClasses(
          subject.subjectAdded._id,
          subject.subjectClasses,
          academicYearID,
          dbRepositoryClass,
        ))
        .then((subject) => res.status(200).json({ success: true, message: `Subject added to ${selectedClass} succesfully`, subject }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjectDataByAcademicYear = async (req, res, next) => {
    try {
      const academicYearID = req.params.id;
      console.log(academicYearID);
      const schoolId = req.schoolAdmin;
      getSubjectById(
        academicYearID,
        schoolId,
        dbRepositorySubject,
      )
        .then((subject) => res.status(200).json({ success: true, message: 'Subjects fetched succesfully', subject }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewExam = async (req, res, next) => {
    console.log('hitting in add exam');
    try {
      console.log(req.body);
      const {
        examName,
        examDate,
        academicYearID,
        selectedSubject,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addExam(
        academicYearID,
        schoolId,
        selectedSubject,
        examDate,
        examName,
        dbRepositoryExam,
        dbRepositorySubject,
        dbRepositoryAcademicYear,
      )
        .then((exam) => res.status(200).json({ success: true, message: 'Exam added succesfully', exam }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async (req, res, next) => {
    try {
      console.log('normal get student called');
      const {
        limit,
        page,
        classID,
      } = req.query;
      getAllStudentsById(
        limit,
        page,
        classID,
        dbRepositoryClass,
        dbRepositoryStudent,
      )
        .then(({ students, classStrength }) => res.status(200).json({
          success: true, message: 'Students fetched succesfully', students, classStrength,
        }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentsBySearch = async (req, res, next) => {
    try {
      console.log('search get student called');
      const {
        limit,
        page,
        classID,
        searchKey,
      } = req.query;
      getAllStudentsById(
        limit,
        page,
        classID,
        dbRepositoryClass,
        dbRepositoryStudent,
        searchKey,
      )
        .then(({ students, classStrength }) => res.status(200).json({
          success: true, message: 'Students fetched succesfully', students, classStrength,
        }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const modifyStudentAccessControl = async (req, res, next) => {
    try {
      console.log(req.body, 'got in body');
      const { status, studentID } = req.body;
      editStudentAccess(
        status,
        studentID,
        dbRepositoryStudent,
      )
        .then((updatedAccess) => res.status(200).json({ success: true, message: 'Student access modified', updatedAccess }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjects = async (req, res, next) => {
    try {
      console.log('normal get subject called');
      const {
        limit,
        page,
        classID,
      } = req.query;
      getAllSubjectsById(
        limit,
        page,
        classID,
        dbRepositoryClass,
        dbRepositorySubject,
      )
        .then(({ subjects, totalSubjects }) => res.status(200).json({
          success: true, message: 'Subjects fetched succesfully', subjects, totalSubjects,
        }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getStatistics = async (req, res, next) => {
    try {
      const schoolId = req.schoolAdmin;
      getAllStatistics(
        schoolId,
        dbRepositoryStudent,
        dbRepositoryFaculty,
        dbRepositoryClass,
      )
        .then((totalStats) => res.status(200).json({ success: true, message: 'Statistics fetched succesfully', totalStats }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  const getAdmissionGraph = async (req, res, next) => {
    try {
      console.log('get graph');
      const { skip } = req.query;
      console.log(skip, 'its hai');
      const schoolId = req.schoolAdmin;
      getYearlyAdmissions(
        skip,
        schoolId,
        dbRepositorySchoolAdmin,
      )
        .then((admissions) => res.status(200).json({ success: true, message: 'Year wise admissions fetched succesfully', admissions }))
        .catch((err) => next(err));
    } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  return {
    addNewSchoolAdmin,
    addNewAcademicYear,
    getSchoolAdminInfo,
    getFacultyNameAcademicYear,
    getAcademicYearData,
    addNewClassRoom,
    getClassRoomDataByAcademicYear,
    addNewSubject,
    getSubjectDataByAcademicYear,
    addNewExam,
    getStudents,
    getStudentsBySearch,
    modifyStudentAccessControl,
    getSubjects,
    getStatistics,
    getAdmissionGraph,
  };
}
