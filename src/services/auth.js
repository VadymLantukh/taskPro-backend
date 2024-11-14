import { randomBytes } from 'crypto';

import { ONE_DAY, THIRTY_DAYS } from '../constants/tokenLifetime.js';

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
