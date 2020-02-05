const monk = require('monk');
const db = monk('localhost/loginform');

module.exports = db;