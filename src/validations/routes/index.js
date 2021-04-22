const auth = require('./auth');
const pagination = require('./pagination/');
const collection = require('./collection/');

module.exports = {
    ...auth,
    ...pagination,
    ...collection
}