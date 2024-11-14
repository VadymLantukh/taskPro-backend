import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValues) {
  const value = process.env[name];

  if (value) return value;
  if (defaultValues) return defaultValues;

  throw new Error(`Missing: process.env[${name}]`);
}
