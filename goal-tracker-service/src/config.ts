import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    app: {
      env: process.env.ENV,
      apikey: process.env.API_KEY,
      jwtSecret: process.env.JWT_SECRET,
      host: process.env.APP_HOST,
      port: process.env.APP_PORT,
      protocol: process.env.APP_PROTOCOL,
    },
  };
});
