const execute = require('../../../../src/validations/models/collectionQueryProperties');

const payload = {
    name: "any_name",
    age: "any_age"
};

const allowedFields = ['name', 'age'];

describe('Sucess', () => {
    test('Should sanitize payload fields correctly', async () => {
       const sanitizedFields = execute(payload, allowedFields);

       expect(sanitizedFields).toEqual(payload);
    });

    test('Should sanitize payload fields correctly with a not allowed field', async () => {
        payload.any_data = 'any_data';
        const sanitizedFields = execute(payload, allowedFields);
 
        delete payload.any_data;
        expect(sanitizedFields).toEqual(payload);
    });

    test('Should sanitize payload fields correctly with an _id field', async () => {
        payload._id = '123';
        const sanitizedFields = execute(payload, allowedFields);
 
        expect(sanitizedFields).toEqual(payload);
    });

    test('Should sanitize payload fields with @>EQ', async () => {
        payload.age = '@>EQ21';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$eq': "21"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });

    test('Should sanitize payload fields with @>GT', async () => {
        payload.age = '@>GT18';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$gt': "18"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });

    test('Should sanitize payload fields with @>LT', async () => {
        payload.age = '@>LT18';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$lt': "18"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });

    test('Should sanitize payload fields with @>GTE', async () => {
        payload.age = '@>GTE18';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$gte': "18"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });

    test('Should sanitize payload fields with @>LTE', async () => {
        payload.age = '@>LTE18';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$lte': "18"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });

    test('Should sanitize payload fields with a combination @>LTE @>GTE', async () => {
        payload.age = '@>LTE18@>GTE10';
        const sanitizedFields = execute(payload, allowedFields);
 
        const expectedPayload = {
            _id: "123",
            age: {
                '$lte': "18",
                '$gte': "10"
            },
            name: "any_name"
        }
        expect(sanitizedFields).toEqual(expectedPayload);
    });
});