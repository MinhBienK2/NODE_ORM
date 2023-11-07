export = {
  id: {
    type: 'string',
    description: 'An id by UUID',
    example: ':5804059e-a081-4a77-be45-a2ee1bc42718',
  },
  ResponseError: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'status of error',
      },
      message: {
        type: 'string',
      },
    },
  },
  ResponseSuccess: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'status of response',
        example: 'success',
      },
    },
  },
};
