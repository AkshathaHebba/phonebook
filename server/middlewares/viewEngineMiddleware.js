const path = require('path');

/**
 * Attach and Configure the view engine for the express app.
 */
function ViewEngineMiddleware() {
    return (app) => {
        app.set('views', path.join(__dirname, '..', 'views'));
        app.set('view engine', 'ejs');
    };
}

module.exports = ViewEngineMiddleware;
