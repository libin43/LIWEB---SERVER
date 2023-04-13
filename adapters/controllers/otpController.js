import { schoolAdminGenerateOtp, schoolAdminVerifyOtp } from '../../application/use_cases/otp/schoolAdminOtp.js';

export default function otpController(
  otpServiceInterface,
  otpServiceImpl,
  authServiceInterface,
  authServiceImpl,
  schoolAdminRepostiory,
  schoolAdminRepositoryMongoDB,
) {
  const dbRepository = schoolAdminRepostiory(schoolAdminRepositoryMongoDB());
  const otpService = otpServiceInterface(otpServiceImpl());
  const authService = authServiceInterface(authServiceImpl());

  const schoolAdminVerifyEmail = async (req, res, next) => {
    try {
      console.log('connceted');
      const { email } = req.body;
      console.log(email, 'got email in controler otp');
      schoolAdminGenerateOtp(
        email,
        dbRepository,
        otpService,
        authService,
      )
        .then((response) => {
          console.log(response, 'its response');
          res.status(200).json(
            {
              success: true, message: 'Otp sent to email id', response,
            },
          );
        })
        .catch((err) => {
          console.log(err, 'errrr called');
          return next(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const schoolAdminOtpLogin = async (req, res, next) => {
    try {
      console.log(req.body, 'got in sadmver otp');
      const [{ otp }, { otpRecievedEmail }] = req.body;
      console.log(otp, otpRecievedEmail);
      schoolAdminVerifyOtp(
        otp,
        otpRecievedEmail,
        dbRepository,
        authService,
      )
        .then((schoolAdmin) => {
          console.log(schoolAdmin);
          const { token, role } = schoolAdmin;
          res.status(200).json(
            {
              success: true, message: 'Otp verification successfull', token, role,
            },
          );
        })
        .catch((err) => {
          console.log(err);
          return next(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    schoolAdminVerifyEmail,
    schoolAdminOtpLogin,
  };
}
