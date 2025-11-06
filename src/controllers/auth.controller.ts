/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { verifyRefreshToken, generateAccessToken } from '../utils/jwt';

import { getProfile } from '../services/auth.service';

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as any)?.id; // set from auth middleware
    const user = await getProfile(userId);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const user: any = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({ id: user.id, email: user.email });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, phone } = req.body;
    const result = await registerUser(email, password, phone);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await loginUser(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // secure: false, // set true in production
      secure: true, // set true in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      user: { email: user.email, phone: user.phone },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
