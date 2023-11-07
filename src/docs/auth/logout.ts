export = {
  post: {
    tags: ['Auth operations'],
    description: 'logout account',
    operationId: 'logout',
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: 'Logout success',
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/ResponseSuccess' },
                {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      describe: 'Message of request',
                    },
                  },
                },
              ],
            },
            example: {
              status: 'success',
              message: 'Logout success',
            },
          },
        },
      },
      400: {
        description: 'Logout fail',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseError',
            },
            example: {
              tokenRequired: {
                status: 'fail',
                message: 'Token is required',
              },
              LogoutFail: {
                status: 'fail',
                message: 'Logout fail',
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
