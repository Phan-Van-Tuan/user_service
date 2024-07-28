import express, { json } from 'express';
import { createServer } from 'http';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';

import CatchLoader from './src/configs/catch.config.js';
import RoutesLoader from './src/configs/router.config.js';
import config from './src/configs/variable.config.js';

var app = express();
app.use(json());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

RoutesLoader.init(app);
CatchLoader.init(app);

const server = createServer(app);

server.listen(config.PORT, () => {
    console.log(`👌 Server running at http://localhost:${config.PORT}/api/${config.VERSION}`);
})