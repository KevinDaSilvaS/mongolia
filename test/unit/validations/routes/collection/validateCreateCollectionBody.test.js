const {validateCreateCollectionBody} = require('../../../../../src/validations/index');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    body: {
        collectionName: "any_collection_name",
        collectionProperties: {}
    }
}

describe('Sucess', () => {
    test('Should pass validations', () => {
        expect(validateCreateCollectionBody(req, res)).toEqual(true);
    });
});

describe('Fail', () => {

    test('Should fail validations with extra fields', () => {
        req.body.any_data = 'any_data';
        expect(validateCreateCollectionBody(req, res)).toEqual(false);
        delete req.body.any_data;
    });

    test('Should fail validations with a non string collectionName field', () => {
        req.body.collectionName = true;
        expect(validateCreateCollectionBody(req, res)).toEqual(false);
        req.body.collectionName = "any_collection_name";
    });

    test('Should fail validations with a non object collectionProperties field', () => {
        req.body.collectionProperties = true;
        expect(validateCreateCollectionBody(req, res)).toEqual(false);
        req.body.collectionProperties = {};
    });

    test('Should fail validations without a collectionName field', () => {
        delete req.body.collectionName;
        expect(validateCreateCollectionBody(req, res)).toEqual(false);
        req.body.collectionName = "any_collection_name";
    });

    test('Should fail validations without a collectionProperties field', () => {
        delete req.body.collectionProperties;
        expect(validateCreateCollectionBody(req, res)).toEqual(false);
        req.body.collectionProperties = {};
    });
    
});