const execute = require('../../../../src/validations/models/modelProperties');
const typeOptions = require('../../../../src/constants/MongooseTypeOptions');

const payload =  {
    requiredStringField: {
        type: "String",
        required:true
    },
        nonRequiredNumberField: {
        type: "Number"
    }
};

describe('Sucess', () => {
    test('Should sanitize payload fields correctly', async () => {
       payload.nonRequiredNumberField.required = false;
       const sanitizedFields = execute(payload);

       expect(sanitizedFields).toEqual(payload);
    });
});

describe('Fail', () => {
    test('Should throw error because of not allowed type property value', async () => {
       payload.nonRequiredNumberField.type = 'any_type';
       try {
            execute(payload);
        } catch (error) {
            expect(error).toEqual(`Type not properly set. Accepted values(${typeOptions.toString()})`);
        }
    });

    test('Should throw error because of not allowed required property value', async () => {
        payload.nonRequiredNumberField.type = 'Number';
        payload.nonRequiredNumberField.required = 'not_bool';
        try {
            execute(payload);
        } catch (error) {
            expect(error).toEqual("Required not properly set. Accepted values(true, false)");
        }
        
     });
});