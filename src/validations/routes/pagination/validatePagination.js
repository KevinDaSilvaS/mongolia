const {pagination} = require('../../../schemas');
const {BAD_REQUEST} = require('../../../constants/HttpCodes');
const response = require('../../../app/response');

const execute = (req, res) => {
    const {limit, page} = req.query;
    const validation = pagination.validate({limit, page});

    if(validation.error){
        response(res, BAD_REQUEST, validation.error.details[0].message);
        return false;
    }

    return true;
}

module.exports = execute;