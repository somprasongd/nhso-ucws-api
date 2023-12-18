const soap = require('soap');
const express = require('express');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

async function main() {
  const client = await soap.createClientAsync(config.URL_WSDL);

  const app = express();
  app.use(cors(config.CORS_OPTIONS));

  routes.initRoutes(app, client);

  const port = config.PORT;
  const server = app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

main();
