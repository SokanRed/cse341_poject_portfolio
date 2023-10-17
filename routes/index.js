const router = require('express').Router();

const maintenance = require('./maintenance');

const vehicle = require('./vehicle');

const swagger = require('./swagger');

router.use('/', vehicle)
    .use('/', maintenance)
    .use('/api-docs', swagger);

module.exports = router;