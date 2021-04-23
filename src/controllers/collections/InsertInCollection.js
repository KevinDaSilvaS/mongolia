const validateFields = require('../../validations/models/collectionBodyProperties');

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

        const sanitizedFields = validateFields(req.body, collectionFields[collectionName]);
        const modelPath = require(collections[collectionName]);
        const operations = new Operations(modelPath);
        const insertedRegister = await operations.insert(sanitizedFields);
        
        return response(res, Status.CREATED, insertedRegister);

    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;