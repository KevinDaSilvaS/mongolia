const Authenticate = require('../../../../src/controllers/auth/Authenticate');
const Status = require('../../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../../src/constants/ErrorMessages');

const req = {
    body: {
        username: "kevin",
        password: "kevin",
    }
};

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const manager = {
    token:{
        username: "kevin",
        password: "kevin",
        token: undefined,
        createToken: jest.fn(() => "123")
    }
}

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})), 
    manager, 
    Status, 
    ErrorMessages
};

describe('Sucess', () => {
    test('Should authenticate succesfully', () => {
        Authenticate(req, res, dependencies);
        expect(dependencies.manager.token.createToken).toHaveBeenCalled();
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.CREATED, { mongolia_auth_token: "123" }
        );
    });
});

describe('Fail', () => {
    test('Should return AUTH_TOKEN_ALREADY_SET because of token already set', () => {
        dependencies.manager.token.token = "123";
        Authenticate(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.AUTH_TOKEN_ALREADY_SET
        );
        dependencies.manager.token.token = undefined;
    });

    test('Should return ERROR_AUTHENTICATING because of incorrect username', () => {
        req.body.username = "any_user";
        Authenticate(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.ERROR_AUTHENTICATING
        );
        req.body.username = "kevin";
    });

    test('Should return ERROR_AUTHENTICATING because of incorrect password', () => {
        req.body.password = "any_password";
        Authenticate(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.ERROR_AUTHENTICATING
        );
        req.body.password = "kevin";
    });

    test('Should return INTERNAL_SERVER_ERROR because of unexpected exception', () => {
        dependencies.manager.token.createToken = () => {throw new Error("Exception");};
        Authenticate(req, res, dependencies);
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Exception")
        );
    });
});