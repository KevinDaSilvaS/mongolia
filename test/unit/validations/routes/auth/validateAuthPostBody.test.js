const {validateAuthPostBody} = require('../../../../../src/validations/index');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    body: {
        username: 'username',
        password : 'password',
    }
}

describe('Sucess', () => {
    test('Should pass validations', () => {
        expect(validateAuthPostBody(req, res)).toEqual(true);
    });
});

describe('Fail', () => {
    test('Should fail validations with username in wrong type', () => {
        req.body.username = 123;
        expect(validateAuthPostBody(req, res)).toEqual(false);
        req.body.username = 'username';
    });

    test('Should fail validations with password in wrong type', () => {
        req.body.password = 123;
        expect(validateAuthPostBody(req, res)).toEqual(false);
        req.body.password = 'password';
    });

    test('Should fail validations with extra fields', () => {
        req.body.any_data = 'any_data';
        expect(validateAuthPostBody(req, res)).toEqual(false);
        delete req.body.any_data
    });

    test('Should fail validations without username', () => {
        delete req.body.username;
        expect(validateAuthPostBody(req, res)).toEqual(false);
        req.body.username = 'username';
    });

    test('Should fail validations without password', () => {
        delete req.body.password;
        expect(validateAuthPostBody(req, res)).toEqual(false);
    });
});