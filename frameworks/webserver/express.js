import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from '../../config/config.js';

export default function expressConfig(app) {
  app.use(helmet());

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Skip CORS for preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use(morgan('combined'));

  const PORT = config.port;

  app.listen(PORT, () => {
    console.log(`LiWeb server port listening to ${PORT}`);
  });
}
