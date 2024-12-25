import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateAccessToken = (email) => {
  console.log(1231)
  console.log('JWT_SECRET:', JWT_SECRET);
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (email) => {
  console.log(1232)  
  console.log('JWT_REFRESH_SECRET:', JWT_REFRESH_SECRET);
  return jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
