import CatchAsync from '@utils/CatchAsync';
import ApiError from '@utils/ApiError';
import { userService } from '@services/index';
import { UsersAttributes } from '@models/users';
import { isEmailExists } from '@services/user.service';

export const getUser = CatchAsync(async (req, res, next) => {
  console.log('user', req.user);
  const { userId } = req.params;
  if (!userId) return next(new ApiError('id not found', 400));

  const data = await userService.handleGetUserById(userId);
  if (!data) return next(new ApiError('not found user', 401));

  return res.status(200).json({
    data,
  });
});

export const createUser = CatchAsync(async (req, res, next) => {
  const body: Omit<UsersAttributes, 'id'> = req.body;

  const checkEmailExists = await isEmailExists(body.email);
  if (checkEmailExists) {
    return next(new ApiError('Email had exists', 401));
  }

  const user = await userService.handleCreateUser(body);
  if (!user) return next(new ApiError('Create fail!', 401));

  return res.status(201).json({
    status: 'success',
    message: 'Create success',
  });
});

export const deleteUser = CatchAsync(async (req, res, next) => {
  const body: { id: string } = req.body;

  const deletedUser = await userService.handleDeleteUserById(body.id);
  if (!deletedUser) return next(new ApiError('Delete fail!', 400));

  return res.status(200).json({
    status: 'success',
    message: 'Delete success',
  });
});
