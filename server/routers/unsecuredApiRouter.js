const express = require('express');
const { SERVER_API_ROUTE_URL } = require('../configs/constants');
const { asyncRouteHandler } = require('../utils/asyncHandlerUtil');
const { getPhonebookNumbers } = require('../controllers/phonebookController');

const unsecuredApiRouter = module.exports = express.Router();

/**
 * Get All Phone Numbers
 */
unsecuredApiRouter.get(SERVER_API_ROUTE_URL.GET_PHONE_NUMBERS, asyncRouteHandler(getPhonebookNumbers));
