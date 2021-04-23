const {validateAuthToken} = require('../../../../../src/validations/index');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    headers: {
        mongolia_auth_token: 'mongolia_auth_token'
    }
}

describe('Sucess', () => {
    test('Should pass validations', () => {
        expect(validateAuthToken(req, res)).toEqual(true);
    });

    test('Should pass validations with extra fields', () => {
        req.headers.any_data = 'any_data';
        expect(validateAuthToken(req, res)).toEqual(true);
    });
});

describe('Fail', () => {
    test('Should fail validations with mongolia_auth_token in wrong type', () => {
        req.headers.mongolia_auth_token = 123;
        expect(validateAuthToken(req, res)).toEqual(false);
        req.headers.mongolia_auth_token = 'mongolia_auth_token';
    });

    test('Should fail validations without mongolia_auth_token', () => {
        delete req.headers.mongolia_auth_token;
        expect(validateAuthToken(req, res)).toEqual(false);
        req.headers.mongolia_auth_token = 'mongolia_auth_token';
    });
});