const express = require('express');
const { createServer } = require('http');
const dotenv = require('dotenv');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const router = require('./src/routes/index.js');

dotenv.config()
const PORT = process.env.PORT || 3002;
const VERSION = process.env.VERSION || 'v1';

var app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(`/api/${VERSION}`, router);

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`👌 Server running at http://localhost:${PORT}/api/${VERSION}`);
})