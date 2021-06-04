import 'dotenv/config';
export const SERVER_PORT: number =
  parseInt(process.env.SERVER_PORT, 10) || 3000;
export const JWT_SECRET = 'JWT_SECRET';
