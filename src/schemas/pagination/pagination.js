const joi = require('joi');

const pagination = joi.object({
    page: joi.number().positive(),
    limit: joi.number().positive()
});

module.exports = {pagination};