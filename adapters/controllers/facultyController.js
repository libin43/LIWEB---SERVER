import addFaculty from '../../application/use_cases/faculty/add.js';
import getName from '../../application/use_cases/faculty/getName.js';

export default function facultyController(
  facultyRepository,
  facultyRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositoryFaculty = facultyRepository(facultyRepositoryImpl());
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
      addFaculty(
        facultyName,
        email,
        phone,
        dateOfBirth,
        dateOfJoin,
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

  const getAllFacultyName = async (req, res, next) => {
    console.log('hititng in get faculty');
    try {
      getName(
        dbRepositoryFaculty,
      )
        .then((facultyName) => res.status(200).json({ success: true, message: 'Faculty name fetched successfully', facultyName }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };
  return {
    addNewFaculty,
    getAllFacultyName,
  };
}
