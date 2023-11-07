export = {
  token: {
    type: 'string',
    description: 'json web token to authorize user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiNjJmMDY3YjFhNDA1YjVhZmZhZjM5Njk0IiwiaWF0IjoxNTE2MjM5MDIyfQ.SmtU-4pFHCw1H6jPpfaYEZrL9zySTwUEeaXl4d6psRQ',
  },
  LoginUserDto: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        describe: 'email of user',
        example: 'phamminhbien333@gmail.com',
      },
      password: {
        type: 'string',
        describe: 'password of user',
        example: '123',
      },
    },
    required: ['email', 'password'],
  },
  ResponseLoginSuccess: {
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
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MDQwNTllLWEwODEtNGE3Ny1iZTQ1LWEyZWUxYmM0MjcxOCIsImlhdCI6MTY5OTI2OTkyNiwiZXhwIjoxNjk5NDQyNzI2fQ.Z6Tq7rLCXFU7KZBJ_TtzNUBfgDbAvmLktYqRBzK7zdA',
              },
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
    ],
  },
};
