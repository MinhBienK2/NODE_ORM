export = {
  post: {
    tags: ['Auth operations'],
    description: 'Refresh toke',
    operationId: 'refresh-toke',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              refreshToken: {
                $ref: '#/components/schemas/token',
              },
              userId: {
                $ref: '#/components/schemas/id',
              },
            },
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
              allOf: [
                {
                  $ref: '#/components/schemas/ResponseSuccess',
                },
                {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        token: {
                          $ref: '#/components/schemas/token',
                        },
                        refreshToken: {
                          $ref: '#/components/schemas/token',
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
      400: {
        description: 'Refresh token fail',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResponseError',
            },
            example: {
              required: {
                status: 'fail',
                message: 'Refresh token and User Id is required',
              },
              fail: {
                status: 'fail',
                message: 'Refresh token fail',
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
