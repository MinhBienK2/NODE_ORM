import { userService } from '@services/index';
import CatchAsync from '@utils/CatchAsync';
import ApiError from '@utils/ApiError';
import { UsersAttributes } from '@models/users';
import { isEmailExists } from '@services/user.service';
import { comparePassword, findUserByEmail } from '@services/auth.service';

export const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return next(new ApiError('Email dose not exist', 400));

  const isPasswordValid = comparePassword(password, user.password);
});

export const register = CatchAsync(async (req, res, next) => {
  const body: UsersAttributes = req.body;

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

export const refreshToken = CatchAsync(async (req, res, next) => {});
