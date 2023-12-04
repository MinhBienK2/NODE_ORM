import logger from '@config/logger';

const handleErrorDevelopment = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleErrorProduction = (err, res) => {
  logger.error(err);
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
