const {modelProperties} = require('../../validations/models/');

const execute = async (req, res, dependencies) => {
    const { response, manager, Status, ErrorMessages, GenerateModelFile } = dependencies;
    const {token, collections} = manager;

    try {
        const {mongolia_auth_token} = req.headers;
        if(token.token != mongolia_auth_token)
            return response(res, Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET);
        
        const {collectionName, collectionProperties} = req.body;
        const sanitizedFields = modelProperties(collectionProperties);

        if(collections[collectionName])
            return response(res, Status.BAD_REQUEST, ErrorMessages.COLLECTION_ALREADY_EXISTS);

        const filePath = GenerateModelFile({collectionName, 
                          collectionProperties: sanitizedFields, 
                          path: `src/database/models/`,
                          addressPath: `../../database/model/`
                        });

        manager.collections[collectionName] = filePath;
        manager.collectionFields[collectionName] = Object.keys(sanitizedFields); 
        return response(res, Status.NO_CONTENT, undefined);

    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;