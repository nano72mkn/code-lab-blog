export const appHost =
  process.env.NODE_ENV === 'production'
    ? 'https://blog.code-lab.xyz'
    : 'http://localhost:3000';
