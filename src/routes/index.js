const route = require('express').Router();


route.use('/astronomy', require('./landings'))

module.exports = route;
