import addFaculty from '../../application/use_cases/faculty/add.js';

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
        .then((faculty) => res.status(200).json({ success: true, message: 'Faculty added successfully   ', faculty }))
        .catch((err) => {
          console.log(err, 'controlleer');
          next(err);
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };
  return {
    addNewFaculty,
  };
}
