const {authHeader} = require('../../schemas/');
const {BAD_REQUEST} = require('../../constants/HttpCodes');
const response = require('../../app/response');

const execute = (req, res) => {
    const validation = authHeader.validate(req.headers);

    if(validation.error){
        response(res, BAD_REQUEST, validation.error.details[0].message);
        return false;
    }

    return true;
}

module.exports = execute;