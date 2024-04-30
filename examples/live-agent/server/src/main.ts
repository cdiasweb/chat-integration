import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWS from 'express-ws';

import { gorgiasRoutes } from './gorgias/gorgias.routes';

const { app } = expressWS(express());

app.use(cors());
app.use(bodyParser.json());
gorgiasRoutes(app);

app.listen(9099, '0.0.0.0');
console.log('server is running on port 9099 for all domains');
