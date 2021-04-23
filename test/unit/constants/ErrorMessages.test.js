const ErrorMessages = require('../../../src/constants/ErrorMessages');

test('Should have the keys and values equal as the values expected', () => {
    expect(ErrorMessages).toEqual(
    {
        ERROR_AUTHENTICATING: "Credentials dont match.",
        AUTH_TOKEN_ALREADY_SET: "Auth token already set. To reset token restart mongolia.",
        AUTH_TOKEN_NOT_PROPERLY_SET: "Auth token not properly set. Token doens't match.",
        COLLECTION_ALREADY_EXISTS: "Collection already exists.",
        COLLECTION_DOES_NOT_EXIST: "Collection doesn't exists.",
    });
});