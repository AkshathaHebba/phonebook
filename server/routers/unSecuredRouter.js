const express = require('express');
const unsecuredApiRouter = require('./unsecuredApiRouter');
const packageJson = require('../../package.json');
const { SERVER_ROUTE_URL } = require('../configs/constants');

const unsecuredRouter = module.exports = express.Router();

const { APP_VERSION } = process.env;

// Attach the Sub router to handle the api calls.
unsecuredRouter.use(SERVER_ROUTE_URL.API, unsecuredApiRouter);

// Render the Home Page.
unsecuredRouter.get(SERVER_ROUTE_URL.HOME, (req, res, next) => res.render('index', {
    APP_VERSION: APP_VERSION ? `/${APP_VERSION}` : '',
    CORE_JS_VERSION: packageJson.version,
}));
