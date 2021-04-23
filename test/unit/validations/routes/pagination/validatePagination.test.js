const {validatePagination} = require('../../../../../src/validations/index');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    query: {
        limit: 1,
        page : 1
    }
}

describe('Sucess', () => {
    test('Should pass validations', () => {
        expect(validatePagination(req, res)).toEqual(true);
    });

    test('Should pass validations with extra fields', () => {
        req.headers.any_data = 'any_data';
        expect(validatePagination(req, res)).toEqual(true);
    });
});

describe('Fail', () => {
    test('Should fail validations because of non positive limit', () => {
        expect(validatePagination({query: {
            limit: 0,
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non numeric limit', () => {
        expect(validatePagination({query: {
            limit: "abc",
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non positive page', () => {
        expect(validatePagination({query: {
            page: 0,
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non numeric page', () => {
        expect(validatePagination({query: {
            page: "abc",
        }}, res)).toEqual(false);
    });
});