const { v4: uuidv4 } = require('uuid');

createToken = () => uuidv4();

const credentials = {
    username: "kevin",
    password: "123",
    token: undefined,
    createToken
}

module.exports = credentials;