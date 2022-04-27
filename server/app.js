// Core imports
const express = require('express');
const router = require('./routers');
const { appDistFolderPath } = require('../client/configs/paths');

// Middlewares
const ViewEngineMiddleware = require('./middlewares/viewEngineMiddleware');
const BodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const LoggerMiddleware = require('./middlewares/loggerMiddleware');
const ErrorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const NotFoundMiddleware = require('./middlewares/notFoundMiddleware');
const StaticFilesMiddleware = require('./middlewares/staticFilesMiddleware');

// Create an express application instance.
const app = express();

// Setup View Engine for Express
ViewEngineMiddleware()(app);

// Setup Logger Middleware
LoggerMiddleware()(app);

// Setup Body parser
BodyParserMiddleware()(app);

// Setting up Static Resource Folder
StaticFilesMiddleware(appDistFolderPath)(app);

// Handle the Application Routing
app.use(router);

// catch 404 and forward to error handler
NotFoundMiddleware()(app);

// Setup the Error handler Middleware
ErrorHandlerMiddleware()(app);

module.exports = app;
