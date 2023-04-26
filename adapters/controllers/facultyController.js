import getAcademicYear from '../../application/use_cases/academicYear/getAcademicYear.js';
import addFaculty from '../../application/use_cases/faculty/add.js';
import getName from '../../application/use_cases/faculty/getName.js';

export default function facultyController(
  facultyRepository,
  facultyRepositoryImpl,
  academicYearRepository,
  academicYearImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositoryFaculty = facultyRepository(facultyRepositoryImpl());
  const dbRepositoryAcademicYear = academicYearRepository(academicYearImpl());
  const authService = authServiceInterface(authServiceImpl());
  const addNewFaculty = async (req, res, next) => {
    try {
      console.log(req.body, 'reached in faculty controller');
      const {
        facultyName,
        email,
        phone,
        dateOfBirth,
        dateOfJoin,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addFaculty(
        facultyName,
        email,
        phone,
        dateOfBirth,
        dateOfJoin,
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
  return {
    addNewFaculty,
    getFacultyNameAcademicYear,
  };
}
