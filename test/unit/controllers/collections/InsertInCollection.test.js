const InsertInCollection = require('../../../../src/controllers/collections/InsertInCollection');
const Status = require('../../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../../src/constants/ErrorMessages');

const req = {
    headers: {
        mongolia_auth_token: "123"
    },
    params: {
        collectionName: "collection_name"
    },
    body: {
        collectionField: 4
    }
};

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const manager = {
    collections: {
        collection_name: "path"
    },
    collectionFields: {
        collection_name: []
    },
    token:{
        token: "123"
    }
}

class Operations {
    constructor(path){

    }

    insert(body) {
        return body;
    };
}

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})), 
    manager, 
    Status, 
    ErrorMessages,
    Operations
};

describe('Sucess', async () => {
    test('Should insert succesfully', async () => {
        await InsertInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.CREATED, {}
        );
    });
});

describe('Fail', () => {
    
    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of invalid token', async () => {
        req.headers.mongolia_auth_token = "456";
        await InsertInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
    });

    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of undefined token', async () => {
        req.headers.mongolia_auth_token = undefined;
        await InsertInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
        req.headers.mongolia_auth_token = "123";
    });

    test('Should return COLLECTION_DOES_NOT_EXIST because of non existent collection', async () => {
        req.params.collectionName = 'any_collection_name';
        await InsertInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.COLLECTION_DOES_NOT_EXIST
        );
    });

    test('Should return COLLECTION_DOES_NOT_EXIST because of undefined collectionName', async () => {
        req.params.collectionName = undefined;
        await InsertInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.COLLECTION_DOES_NOT_EXIST
        );
        req.headers.mongolia_auth_token = "123";
    });
});