import facultyAuth from '../../application/use_cases/auth/facultyAuth.js';
import schoolAdminAuth from '../../application/use_cases/auth/schoolAdminAuth.js';

export default function authController(
  schoolAdminRepostiory,
  schoolAdminRepositoryMongoDB,
  facultyRepository,
  facultyImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositorySchoolAdmin = schoolAdminRepostiory(schoolAdminRepositoryMongoDB());
  const dbRepositoryFaculty = facultyRepository(facultyImpl());
  const authService = authServiceInterface(authServiceImpl());
  const loginSchoolAdmin = async (req, res, next) => {
    try {
      console.log(req.body, '..........');
      const {
        email,
        password,
      } = req.body;
      console.log(email, password, 'got in verfiy shcool admin');
      schoolAdminAuth(
        email,
        password,
        dbRepositorySchoolAdmin,
        authService,
      )
        .then((response) => res.status(200).json(
          {
            success: true,
            message: 'Login Successfull',
            id: response._id,
            token: response.token,
            role: response.role,
            schoolAdminName: response.schoolAdminName,
            schoolName: response.schoolName,
          },
        ))
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      console.log(error, 'caught in trycatch');
    }
  };

  const loginFaculty = async (req, res, next) => {
    try {
      console.log(req.body, '..........');
      const {
        email,
        password,
      } = req.body;
      console.log(email, password, 'got in verfiy faculty');
      facultyAuth(
        email,
        password,
        dbRepositoryFaculty,
        authService,
      )
        .then((response) => res.status(200).json(
          {
            success: true,
            message: 'Login Successfull',
            id: response._id,
            token: response.token,
            role: response.role,
            facultyName: response.facultyName,
          },
        ))
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      console.log(error, 'caught in trycatch');
    }
  };
  return {
    loginSchoolAdmin,
    loginFaculty,
  };
}
