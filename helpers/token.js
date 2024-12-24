import jwt from 'jsonwebtoken';


const JWT_EXPIRATION = '1h'; 
const REFRESH_TOKEN_EXPIRATION = '7d'; 

export const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};