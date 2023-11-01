import logger from '@config/logger';

const handleErrorDevelopment = (err, res) => {
  logger.error(err);
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: `INTERNAL SERVER ERROR !`,
    });
  }
};

export { handleErrorDevelopment, handleErrorProduction };
