const response = require('../../../src/app/response');
const {AUTH_TOKEN_ALREADY_SET} = require('../../../src/constants/ErrorMessages');
const {OK} = require('../../../src/constants/HttpCodes');

const res = {
    status: () => ({send: (data) => data}),
};

describe('Sucess', () => {
    test('Should have call response successfully', async () => {
       const resp = response(res, OK, AUTH_TOKEN_ALREADY_SET);

       expect(resp).toEqual({code:OK, details: AUTH_TOKEN_ALREADY_SET});
    });
});