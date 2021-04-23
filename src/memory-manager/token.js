const { v4: uuidv4 } = require('uuid');

createToken = () => uuidv4();

const credentials = {
    username: undefined,
    password: undefined,
    token: undefined,
    createToken
}

module.exports = credentials;