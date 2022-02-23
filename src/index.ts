import * as os from 'os';
import * as config from './config.json';
import logger from './logger';
import app from './app';

logger.info(`${os.hostname()} running ${config.appName}`);

app.listen(config.port, () => {
  logger.info(`Server started. Listening for requests on port ${config.port}`);
});
