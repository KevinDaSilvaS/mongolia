const validateQuery = require('../../validations/models/collectionQueryProperties');

const execute = async (req, res, dependencies) => {
    const { response, manager, Status, ErrorMessages, Operations } = dependencies;
    const {token, collections, collectionFields} = manager;

    try {
        const {mongolia_auth_token} = req.headers;
        if(token.token != mongolia_auth_token)
            return response(res, Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET);
        
        const {collectionName} = req.params;
        if(!collections[collectionName])
            return response(res, Status.BAD_REQUEST, ErrorMessages.COLLECTION_DOES_NOT_EXIST);

        const sanitizedQuery = validateQuery(req.query, collectionFields[collectionName]);
        const modelPath = require(collections[collectionName]);
        const operations = new Operations(modelPath);
        const deletedInfo = await operations.delete(sanitizedQuery);
        
        return response(res, Status.OK, deletedInfo);

    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;