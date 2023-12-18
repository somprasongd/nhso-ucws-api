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
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}

main();
