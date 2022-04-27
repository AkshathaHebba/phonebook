const webpack = require('webpack');
const path = require('path');
const { v4: uuid } = require('uuid');
const packageJson = require('../../package.json');

const {
    appDistFolderPath,
    appClientStaticDistJSName,
    appClientPath,
} = require('./paths');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isProd = process.env.NODE_ENV === 'production';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = process.env.APP_VERSION ? `/${process.env.APP_VERSION || ''}/` : '/';

const excludeModulesPaths = /(node_modules)/;

const jsFileExtensionsRegex = /\.(js|jsx)$/;

// Add All Common Plugins to the Plugins Array.
const plugins = [
    new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(process.env.APP_VERSION || ''),
        APP_UUID: JSON.stringify(uuid()),
    }),
];

const baseConfig = {
    mode: isProd ? 'production' : 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    // The more I've thought about this, the more I feel that a more limited setting like 'nosources-source-map' is more appropriate,
    // as it gives something like Rollbar or Sentry, because it will produce what's needed for proper stack traces without blatting out all of your source code.
    devtool: isProd ? 'nosources-source-map' : 'cheap-module-source-map',

    plugins,

    entry: [
    // Errors should be considered fatal in development
        path.join(appClientPath, 'index.js'),
    ],

    module: {
        rules: [
            {
                test: jsFileExtensionsRegex,
                resolve: {
                    fullySpecified: false,
                },
                type: 'javascript/auto',
                exclude: excludeModulesPaths,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { modules: true },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.join(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                ],
                include: [
                    appClientPath,
                    path.resolve(path.join('node_modules', '@ids')),
                ],
            },
        ],
    },

    resolve: {
    // Attempt to resolve these extensions in order.
        extensions: ['.jsx', '.js', '.json'],
    },

    output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
        path: appDistFolderPath,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: path.join(appClientStaticDistJSName, `core.${packageJson.version}.js`),
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: path.join(appClientStaticDistJSName, '[name].[contenthash].chunk.js'),
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This is the URL that app is served from. We use "/" in development.
        publicPath,
        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath),
    },
};

module.exports = [
    { ...baseConfig },
];
