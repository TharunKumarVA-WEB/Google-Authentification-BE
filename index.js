require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');

dotenv.config({
  path: path.join(__dirname, './config/dev.env'),
});

const app = express();

app.use(logger('combined'));
app.use(express.json());

app.use('/api/auth/', authRouter);

app.use(function (req, res, next) {
  res.status(404).send();
});

app.use(function (err, req, res, next) {
  res.status(500).send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
