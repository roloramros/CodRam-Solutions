module.exports = {
  apps: [
    {
      name: 'codram-backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        EMAIL_USER: 'roloramros@gmail.com',
        EMAIL_PASS: 'rwhv atmb uear hapw',
        EMAIL_TO: 'roloramros@gmail.com'
      }
    }
  ]
};
