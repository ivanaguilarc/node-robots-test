import bodyParser from 'body-parser';
import express, { ErrorRequestHandler } from 'express';
import swaggerUUi from 'swagger-ui-express';
import logger from './logger';
import { RegisterRoutes } from './routes';

const app = express();

RegisterRoutes(app); // Register routes first, middleware order matters!

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  logger.error(err);

  res.status(500).json({ message: 'Internal Server Error' });
  res.end();
};

app.use(errorHandler);

app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.debug(req);
  next();
});

app.use('/swagger', swaggerUUi.serve, swaggerUUi.setup(undefined, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

export default app;
