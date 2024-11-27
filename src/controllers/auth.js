import createHttpError from 'http-errors';

import { THIRTY_DAYS } from '../constants/tokenLifetime.js';
import {
  getUserById,
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  updateUser,
} from '../services/auth.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUsersController = async (req, res) => {
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfuly registered a user!',
  });
};

export const loginUsersController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Seccessfuly logged in an user',
    data: {
      accessToken: session.accessToken,
      userId: session.userId,
    },
  });
};

export const getUserController = async (req, res, next) => {
  const { _id } = req.user;

  const data = await getUserById(_id);

  if (!data) {
    next(createHttpError(404, `User with id ${_id} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${_id}!`,
    data,
  });
};

export const updateUserController = async (req, res) => {
  const avatar = req.file;
  const { _id } = req.user;
  let avatarUrl;

  if (avatar && env('ENABLE_CLOUDINARY') === 'true') {
    avatarUrl = await saveFileToCloudinary(avatar);
  }

  const updateData = { ...req.body, avatar: avatarUrl };
  const result = await updateUser({ _id }, updateData);

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile!',
    data: result.user,
  });
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
