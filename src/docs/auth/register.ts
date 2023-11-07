export = {
  post: {
    tags: ['Auth operations'],
    description: 'register account',
    operationId: 'register',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#components/schemas/CreateUserDto',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Register success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseNormalUser',
            },
          },
        },
      },
      401: {
        description: 'register fail',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseError',
            },
            example: [
              {
                status: 'fail',
                message: 'Email had exists',
              },
              {
                status: 'fail',
                message: 'Create fail!',
              },
            ],
          },
        },
      },
      500: {
        $ref: '#/components/schemas/InternalServerError',
      },
    },
  },
};
