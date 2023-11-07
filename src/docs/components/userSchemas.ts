export = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'ObjectId',
        description: 'User identification number',
        example: '63390ffb769306d131512c00',
        required: true,
      },
      username: {
        type: 'string',
        description: 'first name of user',
        example: 'Minh',
        required: true,
      },
      email: {
        type: 'string',
        description: "User's email",
        example: 'dangdungvdl@gmail.com',
        required: true,
      },
      role: {
        type: 'string',
        description: "user's role",
        example: 'user',
      },
      createdAt: {
        type: 'date',
        description: "User's time created",
        example: '1699264504807',
      },
      updatedAt: {
        type: 'date',
        description: "User's time updated",
        example: '1699264504807',
      },
    },
    required: ['username', 'email', 'password', 'role'],
  },
  ResponseNormalUser: {
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
              user: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    ],
  },
  CreateUserDto: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'first name of user',
        example: 'Minh',
      },
      password: {
        type: 'string',
        description: 'Password of user',
        example: '123',
      },
      email: {
        type: 'string',
        description: "User's email",
        example: 'dangdungvdl@gmail.com',
      },
      role: {
        type: 'number',
        description: "User's role",
        example: 0, // o-user 1-admin
      },
    },
    required: ['username', 'email', 'password'],
  },
};
