const express = require('express');
const unSecuredRouter = require('./unSecuredRouter');

// Create an Application Router to handle the requests
const router = module.exports = express.Router();

// Attach the unsecured Router.
router.use(unSecuredRouter);
