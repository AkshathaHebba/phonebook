const logger = require('morgan');

/**
 * Attach and Configure the Body Parser for the express app.
 */
function LoggerMiddleware(options = {}) {
    const loggerInstanceType = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
    const loggerInstance = logger(loggerInstanceType);

    return (app) => {
    // Body parser
        app.use(loggerInstance);
    };
}

module.exports = LoggerMiddleware;
