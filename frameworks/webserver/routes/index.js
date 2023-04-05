import schoolAdminRouter from './schoolAdmin.js';

export default function routes(app, express) {
  app.use('/api/v1/school_admin', schoolAdminRouter(express));
}
