const router = require('express').Router();

const myController = require('../controllers');

const contact = require('./maintenance');

const contact = require('./vehicles');

const swagger = require('./swagger');

router.use('/', contact)
    .use('/api-docs', swagger);

module.exports = router;