import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWS from 'express-ws';

import { gorgiasRoutes } from './gorgias/gorgias.routes';

const { app } = expressWS(express());

let origin = '*';

const corsOptions = {
  origin, // Allow only this origin
};

app.use(cors(corsOptions));
// Increase limit to 10MB (adjust as needed)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});

gorgiasRoutes(app);

app.listen(9099, '0.0.0.0');
console.log('server is running on port 9099 for all domains');
