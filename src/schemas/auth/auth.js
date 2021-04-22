const joi = require('joi');
const {token} = require('../../memory-manager/token');

const authPostBody = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const authHeader = joi.object({
    mongolia_auth_token: joi.string().equal(token).required()
});

module.exports = {authPostBody, authHeader};