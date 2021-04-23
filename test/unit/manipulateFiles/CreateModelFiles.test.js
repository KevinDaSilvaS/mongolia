const createModelFile = require('../../../src/manipulateFiles/CreateModelFiles');

const data = {
    collectionName: "collectionName",
    collectionProperties: {},
    path: "src/database/models",
    addressPath: "my/mocked/path"
}

describe('Sucess', () => {
    test('Should create model file', async () => {
        expect(await createModelFile(data)).toEqual(
            `${data.addressPath}/${data.collectionName}Model.js`);
    });
});

describe('Fail', () => {
    test('Should fail to model file because of non existing folder', async () => {
        data.path = "any_path"
        try {
            await createModelFile(data);
        } catch (error) {
            expect(error).toEqual("No such file or directory.");
        }
        
    });
});
