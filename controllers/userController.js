import { generateAccessToken, generateRefreshToken } from '../helpers/tokens.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const accessToken = generateAccessToken(user.email);
    const refreshToken = generateRefreshToken(user.email);


    user.refreshToken = refreshToken; 
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    const sanitizedUser = user.toJson();

    // Return response with access token and user information
    res.status(200).json({
      accessToken,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Read refresh token from cookies

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessToken(user.email);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Read refresh token from cookies

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null } // Clear the refresh token
    );

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
