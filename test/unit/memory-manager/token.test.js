const token = require('../../../src/memory-manager/token');

describe('Sucess', () => {
    test('Should generate and set token', () => {
        const createdToken = token.createToken();
        token.token = createdToken;
        expect(createdToken).toEqual(token.token);
    });
});