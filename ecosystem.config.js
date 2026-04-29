module.exports = {
  apps: [
    {
      name: 'codram-backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
