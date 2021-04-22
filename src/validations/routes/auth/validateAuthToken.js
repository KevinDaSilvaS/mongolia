const {authHeader} = require('../../../schemas/');
const {BAD_REQUEST} = require('../../../constants/HttpCodes');
const response = require('../../../app/response');

const execute = (req, res) => {
    const mongolia_auth_token = req.headers.mongolia_auth_token;
    const validation = authHeader.validate({mongolia_auth_token});

    if(validation.error){
        response(res, BAD_REQUEST, validation.error.details[0].message);
        return false;
    }

    return true;
}

module.exports = execute;