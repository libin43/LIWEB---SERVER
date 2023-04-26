import addAcademicYear from '../../application/use_cases/academicYear/addAcademicYear.js';
import addClass from '../../application/use_cases/classRoom/addClass.js';
import findById from '../../application/use_cases/schoolAdmin/findById.js';
import addSchoolAdmin from '../../application/use_cases/schoolAdmin/signup.js';

export default function schoolAdminController(
  schoolAdminRepository,
  schoolAdminImpl,
  academicYearRepository,
  academicYearImpl,
  classRepository,
  classImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositorySchoolAdmin = schoolAdminRepository(schoolAdminImpl());
  const dbRepositoryAcademicYear = academicYearRepository(academicYearImpl());
  const dbRepositoryClass = classRepository(classImpl());
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
      console.log('hitting in getinfo');
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

  return {
    addNewSchoolAdmin,
    addNewAcademicYear,
    getSchoolAdminInfo,
    addNewClassRoom,
  };
}
