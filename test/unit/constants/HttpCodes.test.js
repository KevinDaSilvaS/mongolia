const HttpCodes = require('../../../src/constants/HttpCodes');

test('Should have the keys and values equal as the values expected', () => {
    expect(HttpCodes).toEqual(
    {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        NOT_AUTHORIZED: 401,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    });
});