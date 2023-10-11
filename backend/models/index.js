const dbConfiguration = require('../configuration');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfiguration.url;
db.vehicles = require('./vehicles.js')(mongoose);
db.maintenance = require('/maintenance.js')(mongoose);

module.exports = db;