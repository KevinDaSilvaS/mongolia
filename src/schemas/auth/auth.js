const joi = require('joi');

const authPostBody = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const authHeader = joi.object({
    mongolia_auth_token: joi.string().required()
});

module.exports = {authPostBody, authHeader};