const joi = require('joi');

const authPostBody = joi.object({
    collectionName: joi.string().required(),
    collectionProperties: joi.object().required()
});

const authHeader = joi.object({
    mongolia_auth_token: joi.string().required()
});

module.exports = {authPostBody, authHeader};