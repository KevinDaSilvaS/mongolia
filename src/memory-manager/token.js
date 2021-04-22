import { v4 as uuidv4 } from 'uuid';

createToken = () => uuidv4();

const credentials = {
    username: undefined,
    password: undefined,
    token: undefined,
    createToken
}

module.exports = credentials;