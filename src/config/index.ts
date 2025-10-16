import { config } from 'dotenv';

config();

const { PORT } = process.env;

export const configs = {
  PORT: PORT || 3000,
};
