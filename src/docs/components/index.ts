import commonSchemas from './commonSchemas';
import userSchemas from './userSchemas';
import authSchemas from './authSchemas';
import responseSchemas from './responseSchemas';

export = {
  components: {
    schemas: {
      ...commonSchemas,
      ...userSchemas,
      ...authSchemas,
      ...responseSchemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
