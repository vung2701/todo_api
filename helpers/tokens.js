import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateAccessToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (email) => {
  return jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
