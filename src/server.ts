import { configs } from './config';

import app from './app';

import logger from './config/logger';
const StartServer = async () => {
  try {
    app.listen(configs.PORT, () => {
      logger.info(`Server running on port `, { port: configs.PORT, env: configs.NODE_ENV });
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

StartServer();
