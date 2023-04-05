import schoolAdminRouter from './schoolAdmin.js';
import authRouter from './auth.js';

export default function routes(app, express) {
  app.use('/api/v1/school_admin', schoolAdminRouter(express));
  app.use('/api/v1/auth', authRouter(express));
}
