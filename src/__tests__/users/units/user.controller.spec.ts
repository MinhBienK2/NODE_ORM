import { NextFunction } from 'express';
import httpMocks from 'node-mocks-http';
import { mocked } from 'jest-mock';

import { userController } from 'controllers';
import { Users } from 'models/users';
import initTestingModule from 'config/testingModule';
import { userIdMock, userInvalidIdMock, userMock } from '../mocks/getUser.mock';
import ApiError from '@utils/ApiError';
import { mock } from 'node:test';

let req, res, next;

// mock User model && next fn
jest.mock('models/users');
// jest.mock('utils/ApiError.ts');
const mockUserModel = mocked(Users, { shallow: true });

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Test suite user.controller.getUser', () => {
  it('should has a getUser() method', () => {
    expect(Object.prototype.hasOwnProperty.call(userController, 'getUser')).toBeTruthy();
    expect(typeof userController.getUser).toBe('function');
  });

  it('should return user with status code = 200', async () => {
    // Arrange
    req.params = { userId: userIdMock };
    mockUserModel.findOne.mockReturnValue(userMock as any);
    // Act
    await userController.getUser(req, res, next);
    const {
      status,
      data: { user },
    } = res._getJSONData(); // short-hand for JSON.parse( response._getData() )

    // Assert
    expect(mockUserModel.findOne).toHaveBeenCalledWith({
      where: {
        id: req.params.userId,
      },
    });
    expect(status).toEqual('success');
    expect(user).toEqual(userMock);
    expect(res.statusCode).toBe(200);
  });
  it('should throw bad request error when provided id is invalid', async () => {
    // Arrange
    req.params = { userId: userInvalidIdMock };
    const error = {
      status: 'fail',
      message: 'Invalid ID',
    };

    // Act
    await userController.getUser(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(error);
    // const expectedError = new ApiError('Invalid ID', 400);
    // const calls = next.mock.calls;
    // const lastCall = calls[calls.length - 1];
    // const passedError = lastCall[0];

    // expect(ApiError).toHaveBeenCalledWith('Invalid ID', 400);
    // expect(next).toHaveBeenCalled();
    // expect(passedError.message).toEqual(expectedError.message);
    // expect(passedError.status).toEqual(expectedError.status);
  });
  it('should throw not found error when user id not exists', async () => {});
});
