const {validateCreateCollectionBody} = require('../../../../../src/validations/index');

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
        expect(validateCreateCollectionBody(req, res)).toEqual(true);
    });

    test('Should pass validations with extra fields', () => {
        req.headers.any_data = 'any_data';
        expect(validateCreateCollectionBody(req, res)).toEqual(true);
    });
});

describe('Fail', () => {
    test('Should fail validations because of non positive limit', () => {
        expect(validateCreateCollectionBody({query: {
            limit: 0,
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non numeric limit', () => {
        expect(validateCreateCollectionBody({query: {
            limit: "abc",
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non positive page', () => {
        expect(validateCreateCollectionBody({query: {
            page: 0,
        }}, res)).toEqual(false);
    });
    
    test('Should fail validations because of non numeric page', () => {
        expect(validateCreateCollectionBody({query: {
            page: "abc",
        }}, res)).toEqual(false);
    });
});