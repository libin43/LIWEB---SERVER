import schoolAdminRouter from './schoolAdmin.js';
import authRouter from './auth.js';
import otpRouter from './otp.js';

export default function routes(app, express) {
  app.use('/api/v1/school_admin', schoolAdminRouter(express));
  app.use('/api/v1/auth', authRouter(express));
  app.use('/api/v1/otp', otpRouter(express));
}
