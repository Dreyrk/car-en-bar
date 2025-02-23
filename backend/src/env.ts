import { load } from 'ts-dotenv';

// https://github.com/LeoBakerHytch/ts-dotenv

export default load({
  JWT_PRIVATE_KEY: String,
  CORS_ALLOWED_ORIGINS: String,
  NODE_ENV: ['production' as const, 'development' as const, 'test' as const],
  SERVER_HOST: { type: String, optional: true, default: 'localhost' },
  SERVER_PORT: { type: Number, optional: true, default: 4000 },
  DB_HOST: { type: String, optional: true, default: 'localhost' },
  DB_PORT: { type: Number, optional: true, default: 5432 },
  DB_USER: { type: String, optional: true, default: 'postgres' },
  DB_PASS: { type: String, optional: true, default: 'password' },
  DB_NAME: { type: String, optional: true, default: 'carenbar' },
});
