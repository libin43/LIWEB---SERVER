import schoolAdminAuth from '../../application/use_cases/auth/schoolAdminAuth.js';

export default function authController(
  schoolAdminRepostiory,
  schoolAdminRepositoryMongoDB,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositorySchoolAdmin = schoolAdminRepostiory(schoolAdminRepositoryMongoDB());
  const authService = authServiceInterface(authServiceImpl());
  console.log(authService);
  const loginSchoolAdmin = async (req, res, next) => {
    try {
      console.log(req.body);
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
            success: true, message: 'Login Successfull', token: response.token, role: response.role,
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
  };
}
