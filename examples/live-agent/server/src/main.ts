import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWS from 'express-ws';

import { gorgiasRoutes } from './gorgias/gorgias.routes';

const { app } = expressWS(express());

app.use(cors({
  origin: 'http://localhost:3006'
}));

// Increase limit to 10MB (adjust as needed)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

gorgiasRoutes(app);

app.listen(9099, '0.0.0.0');
console.log('server is running on port 9099 for all domains');
