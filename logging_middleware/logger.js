// logging_middleware/logger.js

function requestLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

function errorLogger(err, req, res, next) {
  console.error(`[ERROR] ${new Date().toISOString()} ${err.message}`);
  next(err);
}

module.exports = {
  requestLogger,
  errorLogger,
};
