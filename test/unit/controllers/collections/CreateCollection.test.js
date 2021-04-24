const CreateCollection = require('../../../../src/controllers/collections/CreateCollection');
const Status = require('../../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../../src/constants/ErrorMessages');

const req = {
    headers: {
        mongolia_auth_token: "123"
    },
    body: {
        collectionName: "collection_name",
        collectionProperties: {
            collectionField: {
                type: "Number",
                required: true
            }
        },
    }
};

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const manager = {
    collections: {},
    collectionFields: {},
    token:{
        token: "123"
    }
}

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})), 
    manager, 
    Status, 
    ErrorMessages,
    GenerateModelFile: jest.fn(() => ("path"))
};

describe('Sucess', async () => {
    test('Should authenticate succesfully', async () => {
        await CreateCollection(req, res, dependencies);
        expect(dependencies.GenerateModelFile).toHaveBeenCalled();
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.NO_CONTENT, undefined
        );
    });
});

describe('Fail', () => {
    
    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of invalid token', async () => {
        req.headers.mongolia_auth_token = "456";
        await CreateCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
    });

    test('Should return AUTH_TOKEN_NOT_PROPERLY_SET because of undefined token', async () => {
        req.headers.mongolia_auth_token = undefined;
        await CreateCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_NOT_PROPERLY_SET
        );
        req.headers.mongolia_auth_token = "123";
    });

    test('Should return INTERNAL_SERVER_ERROR because of unexpected exception', () => {
        dependencies.GenerateModelFile = () => {throw new Error("Exception");};
        CreateCollection(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Exception")
        );
    });
});