const {pagination} = require('../../../schemas');
const {BAD_REQUEST} = require('../../../constants/HttpCodes');
const response = require('../../../app/response');

const execute = (req, res) => {
    const validation = pagination.validate(req.query);

    if(validation.error){
        response(res, BAD_REQUEST, validation.error.details[0].message);
        return false;
    }

    return true;
}

module.exports = execute;