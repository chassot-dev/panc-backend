function ensureEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ${name} não definida`);
  return value;
}

export const ENV = {
  DB_HOST: ensureEnv('DB_HOST'),
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_USER: ensureEnv('DB_USER'),
  DB_PASSWORD: ensureEnv('DB_PASSWORD'),
  DB_NAME: ensureEnv('DB_NAME'),
  APP_PORT: Number(process.env.APP_PORT || 3000),
  SECRET: ensureEnv('SECRET')
};
