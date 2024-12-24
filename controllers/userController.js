import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_EXPIRATION = '1h'; // Thời gian hết hạn của Access Token
const REFRESH_TOKEN_EXPIRATION = '7d'; // Thời gian hết hạn của Refresh Token

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(user)

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_RERESH_SECRET , { expiresIn: REFRESH_TOKEN_EXPIRATION });

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
