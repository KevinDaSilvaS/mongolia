const auth = require('./auth/auth');
const pagination = require('./pagination/pagination');

module.exports = {
    ...auth,
    ...pagination
}