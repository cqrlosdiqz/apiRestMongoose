const route = require('express').Router();


route.use('/astronomy', require('./landings'))
route.use('/astronomy', require('./neas'))

module.exports = route;
