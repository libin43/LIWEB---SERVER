import otpController from '../../../adapters/controllers/otpController.js';
import otpServiceInterface from '../../../application/services/otpServiceInterface.js';
import otpServiceImpl from '../../services/otpService.js';
import authServiceInterface from '../../../application/services/authServiceInterface.js';
import authServiceImpl from '../../services/authService.js';
import schoolAdminRepostiory from '../../../application/repositories/schoolAdminRepository.js';
import schoolAdminRepositoryMongoDB from '../../database/mongoDB/repositories/schoolAdminRepositoryMongoDB.js';

export default function otpRouter(express) {
  const router = express.Router();

  const controller = otpController(
    otpServiceInterface,
    otpServiceImpl,
    authServiceInterface,
    authServiceImpl,
    schoolAdminRepostiory,
    schoolAdminRepositoryMongoDB,
  );
    // GET enpdpoints

  // POST enpdpoints
  router.route('/verify_info').post(controller.schoolAdminVerifyEmail);
  router.route('/verify_otp').post(controller.schoolAdminOtpLogin);
  return router;
}
