import getUser from './getUser';

export = {
  '/api/v1/users/{id}': {
    ...getUser,
  },
};
