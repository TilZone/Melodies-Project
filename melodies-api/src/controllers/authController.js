import User from '../models/user.js';
import { successResponse, errorResponse } from '../utils/response.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Please enter all fields');
    }

    let user = await User.findOne({ email });
    if (user) {
      return errorResponse(res, 400, 'User already exists');
    }

    user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    successResponse(res, 201, 'User registered successfully', {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, 'Please enter all fields');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, 'Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 400, 'Invalid credentials');
    }

    const token = generateToken(user._id);
    successResponse(res, 200, 'User logged in successfully', {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
