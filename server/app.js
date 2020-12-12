const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const config = require('./config');
const { sequelize } = require('./db');

// Express server setup
const app = express();

app.use(logger('dev', { immediate: false } ));
app.use(bodyParser.json());
app.use(fileUpload());

// API handlers
app.use('/api/files', require('./files'));

// Static files
app.use(express.static('../client'));

// Start listening server
app.listen(config.service.port, async () => {
    await sequelize.sync();
    console.info(`Server ready on port ${config.service.port}`);
});
