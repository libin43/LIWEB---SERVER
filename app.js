import express from 'express';
import mongoose from 'mongoose';
import expressConfig from './frameworks/webserver/express.js';
import routes from './frameworks/webserver/routes/index.js';
import config from './config/config.js';
import mongoConnection from './frameworks/database/mongoDB/connection.js';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware.js';

const app = express();

expressConfig(app);

// DB configuration and connection create
mongoConnection(mongoose, config, {
  autoIndex: false,
  connectTimeoutMS: 1000,
}).connectToMongo();

// routes for each endpoint
routes(app, express);

// error handling middleware
app.use(errorHandlingMiddleware);

export default app;
