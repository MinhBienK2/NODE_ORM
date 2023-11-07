export = {
  post: {
    tags: ['Auth operations'],
    description: 'Login account',
    operationId: 'login',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginUserDto',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseLoginSuccess',
            },
          },
        },
      },
      400: {
        description: 'Login fail',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseError',
            },
            example: {
              notValidEmailOrPassword: {
                status: 'fail',
                message: 'not valid email or password',
              },
              incorrectEmailOrPassword: {
                status: 'fail',
                message: 'Incorrect email or password',
              },
            },
          },
        },
      },
      500: {
        $ref: '#/components/schemas/InternalServerError',
      },
    },
  },
};
