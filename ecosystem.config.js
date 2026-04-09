module.exports = {
  apps: [
    {
      name: 'ib-api',
      cwd: './backend',
      script: 'dist/main.js',
      env: { NODE_ENV: 'production', PORT: 3000 },
      instances: 1,
      autorestart: true,
    },
    {
      name: 'ib-web',
      cwd: './frontend',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      env: { NODE_ENV: 'production' },
      instances: 1,
      autorestart: true,
    },
  ],
};
