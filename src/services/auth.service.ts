import User from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export async function getProfile(userId: string) {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
}

export async function registerUser(email: string, password: string, phone: string) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already exists');

  const hashed = await hashPassword(password);

  await User.create({ email, password: hashed, phone });

  return { message: 'User registered successfully' };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

  return { accessToken, refreshToken, user };
}
