const joi = require('joi');

const authPostBody = joi.object({
    collectionName: joi.string().required(),
    collectionProperties: joi.object().required()
});

module.exports = {authPostBody};