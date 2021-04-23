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
});