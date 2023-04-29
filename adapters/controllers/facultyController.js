import addFaculty from '../../application/use_cases/faculty/add.js';

export default function facultyController(
  facultyRepository,
  facultyRepositoryImpl,
  academicYearRepository,
  academicYearImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositoryFaculty = facultyRepository(facultyRepositoryImpl());
  // const dbRepositoryAcademicYear = academicYearRepository(academicYearImpl());
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

  return {
    addNewFaculty,
  };
}
