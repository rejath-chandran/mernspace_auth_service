import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key';

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1m' });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '3m' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
