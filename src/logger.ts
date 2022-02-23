import pino from 'pino';

const dev = process.env.NODE_ENV?.toUpperCase() === 'development'.toUpperCase();

const logger = pino({
  level: dev ? 'debug' : 'info',
  transport: dev ? { target: 'pino-pretty' } : undefined,
});

export default logger;
