export = {
  InternalServerError: {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ResponseError',
        },
        example: {
          status: 'error',
          message: 'INTERNAL SERVER ERROR !',
        },
      },
    },
  },
};
