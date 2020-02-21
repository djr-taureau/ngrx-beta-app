const POSTMAN_CATCHALL_PROXY = {
  context: ['/api'],
  target: 'https://3ee63553-cc38-4cf2-add2-4356fbbd6298.mock.pstmn.io',
  pathRewrite: {
    '^/api': ''
  },
  changeOrigin: true,
  logLevel: 'debug',
};

const CONFIG_PROXY = {
  context: ['/config'],
  target: 'https://localhost:4200',
  pathRewrite: {
    '^/config': '/config/configuration.json'
  },
  changeOrigin: true,
  logLevel: 'debug',
  secure: false
};

module.exports = [
  CONFIG_PROXY,
  POSTMAN_CATCHALL_PROXY
];
