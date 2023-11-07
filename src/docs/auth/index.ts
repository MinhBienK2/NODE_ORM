const login = require('./login');
const register = require('./register');
const logout = require('./logout');
const refreshToken = require('./refreshToken');

export = {
  '/api/v1/auth/login': {
    ...login,
  },
  '/api/v1/auth/register': {
    ...register,
  },
  '/api/v1/auth/logout': {
    ...logout,
  },
  '/api/v1/auth/refresh': {
    ...refreshToken,
  },
};
