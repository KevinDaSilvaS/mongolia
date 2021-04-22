const joi = require('joi');

const createCollectionPostBody = joi.object({
    collectionName: joi.string().required(),
    collectionProperties: joi.object().required()
});

module.exports = {createCollectionPostBody};