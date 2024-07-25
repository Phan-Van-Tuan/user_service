import express, { json } from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';


import CatchLoader from './src/configs/catch.config.js';
import RoutesLoader from './src/configs/router.config.js';

config()
const PORT = process.env.PORT || 3002;
const VERSION = process.env.VERSION || 'v1';

var app = express();
app.use(json());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

RoutesLoader.init(app);
CatchLoader.init(app);

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`👌 Server running at http://localhost:${PORT}/api/${VERSION}`);
})