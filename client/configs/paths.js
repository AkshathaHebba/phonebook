const path = require('path');
const fs = require('fs');

// Path to current application folder.
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Method resolve the absolute path of given the relative path of the folder.
 */
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// Path to the Dist Folder to serve the Client application.
const appDistFolderPath = resolveApp('dist');

// Client JS folder Name
const appClientStaticDistJSName = 'js';

// Path to the Client Package Folder
const appClientPath = resolveApp('client');

module.exports = {
    // Client Paths
    appDistFolderPath,
    appClientStaticDistJSName,
    appClientPath,
};
