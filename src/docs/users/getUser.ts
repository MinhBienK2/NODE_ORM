export = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get User by Id',
    operatorId: 'getUserId',

    parameters: [
      {
        name: 'id',
        description: 'id of user',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
      },
    ],
    requestBody: {},
    responses: {
      200: {
        description: 'Get user by id success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Get user by id fail',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseError',
            },
            example: {
              idNotFound: {
                status: 'fail',
                message: 'id not found',
              },
              userNotFound: {
                status: 'fail',
                message: 'not found user',
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
