import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: 'https://admin-dash-ecom-five.vercel.app',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.post('/auth/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true, // true on HTTPS (Vercel/Render)
    sameSite: 'none',
    path: '/',
  });

  return res.json({ message: 'Logged out successfully' });
});

export default app;
