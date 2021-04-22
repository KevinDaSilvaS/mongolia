const createFile = require('./manipulateFiles/CreateModelFiles');

createFile({
    collectionName: "users",
    collectionProperties: {
        name: {
            type: "String",
            required: true
        }
    },
    path: "src/database/models",
    addressPath: "./database/models"
});