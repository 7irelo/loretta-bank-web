const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

const logRequest = (req, res, next) => {
  res.on('finish', () => {
    const { statusCode } = res;
    logger.info({
      method: req.method,
      url: req.url,
      status: statusCode,
      responseTime: `${Date.now() - req.startTime}ms`
    });
  });
  
  req.startTime = Date.now();
  logger.info({
    method: req.method,
    url: req.url,
    body: req.body
  });

  next();
};

const logResponse = (status, message, data) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    status,
    message,
    data: data ? JSON.stringify(data) : null
  };

  logger.info('Response', logEntry);
};

module.exports = {
  logRequest,
  logResponse,
};
