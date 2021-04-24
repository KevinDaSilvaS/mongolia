const GetInCollection = require('../../../../src/controllers/collections/GetInCollection');
const Status = require('../../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../../src/constants/ErrorMessages');

const req = {
    headers: {
        mongolia_auth_token: "123"
    },
    params: {
        collectionName: "collection_name"
    },
    query: {}
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

    getPaginated(data, limit, page) {
        return [data];
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
    test('Should get succesfully', async () => {
        await GetInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.OK, [{}]
        );
    });
});

describe('Fail', () => {
    
    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of invalid token', async () => {
        req.headers.mongolia_auth_token = "456";
        await GetInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
    });

    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of undefined token', async () => {
        req.headers.mongolia_auth_token = undefined;
        await GetInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
        req.headers.mongolia_auth_token = "123";
    });

    test('Should return COLLECTION_DOES_NOT_EXIST because of non existent collection', async () => {
        req.params.collectionName = 'any_collection_name';
        await GetInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.COLLECTION_DOES_NOT_EXIST
        );
    });

    test('Should return COLLECTION_DOES_NOT_EXIST because of undefined collectionName', async () => {
        req.params.collectionName = undefined;
        await GetInCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.COLLECTION_DOES_NOT_EXIST
        );
        req.headers.mongolia_auth_token = "123";
    });
});