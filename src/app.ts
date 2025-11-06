import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.post('/auth/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    // secure: false, // set true in production
    secure: true, // set true in production
    sameSite: 'strict',
  });

  return res.json({ message: 'Logged out successfully' });
});

export default app;
