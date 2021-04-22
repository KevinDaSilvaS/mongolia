const auth = require('./auth/auth');
const pagination = require('./pagination/pagination');
const collection = require('./collection/collection');

module.exports = {
    ...auth,
    ...pagination,
    ...collection
}