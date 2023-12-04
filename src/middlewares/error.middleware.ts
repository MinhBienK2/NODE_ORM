import { Response } from 'express';

const { errorController } = require('@controllers/index');

const handleError = (err, req, res: Response, next) => {
  console.log('co loi o day ne');
  console.log(err);
  const error = { ...err };
  error.message = err.message;
  error.stack = err.stack;
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    errorController.handleErrorDevelopment(error, res);
  else if (process.env.NODE_ENV === 'production') errorController.handleErrorProduction(error, res);
};

export default handleError;
