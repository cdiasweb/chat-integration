import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWS from 'express-ws';
import https from 'https';
import fs from 'fs';

import { gorgiasRoutes } from './gorgias/gorgias.routes';

let server = expressWS(express());
let httpsServer = null;

if (process.env.ENVIRONMENT === 'production') {
  const expressApp = express();

  const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/chatbot-farmapiel.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/chatbot-farmapiel.com/cert.pem'),
  };

  // Set up HTTPS server
  httpsServer = https.createServer(sslOptions, expressApp);

  server = expressWS(expressApp, httpsServer);
}

const { app } = server;

// Increase limit to 10MB (adjust as needed)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: '*'
}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

gorgiasRoutes(app);

// Https config
if (process.env.ENVIRONMENT === 'production' && httpsServer) {
  // Start the HTTPS server on port 443
  httpsServer.listen(443, () => {
    console.log('HTTPS server with WebSockets is running on port 443');
  });
} else {
  app.listen(9099, '0.0.0.0');
  console.log('server is running on port 9099 for all domains');
}
