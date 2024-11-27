import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { ONE_DAY, THIRTY_DAYS } from '../constants/tokenLifetime.js';
import { UsersCollection } from '../db/User.js';
import { SessionsCollection } from '../db/Session.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_DAY),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encrypdetPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encrypdetPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'The password is not correct');

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {
    ...session.toObject(),
    userId: user._id,
  };
};

export const getUserById = async (id) => {
  const data = await UsersCollection.findById(id).populate({
    path: 'boards',
    select: 'title icon backgroundImage',
  });

  return data;
};

export const updateUser = async (filter, payload, options = {}) => {
  const currentUser = await UsersCollection.findOne(filter).populate({
    path: 'boards',
    select: 'title icon backgroundImage',
  });
  if (!currentUser) throw createHttpError(404, 'Not found user');

  if (payload.theme && payload.theme === currentUser.theme) {
    return {
      user: currentUser,
    };
  }

  if (payload.password) {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = encryptedPassword;
  }

  const rawResult = await UsersCollection.findOneAndUpdate(filter, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired = Date.now() > session.refreshTokenValidUntil;
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
