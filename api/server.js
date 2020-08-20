const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const dinersRouter = require('../diners/diners-router');
const trucksRouter = require('../trucks/trucks-router');
const operatorsRouter = require('../operators/operators-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/diners', dinersRouter);
server.use('/api/trucks', trucksRouter);
server.use('/api/operators', operatorsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;