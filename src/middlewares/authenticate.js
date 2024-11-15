import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/Session.js';
import { UsersCollection } from '../db/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired = Date.now() > session.accessTokenValidUntil;
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401, 'User not found in basedate'));
    return;
  }

  req.user = user;

  next();
};
