const Authenticate = require('./auth/Authenticate');
const CreateCollection = require('./collections/CreateCollection');
const InsertInCollection = require('./collections/InsertInCollection');
const DeleteInCollection = require('./collections/DeleteInCollection');
const GetInCollection = require('./collections/GetInCollection');
const UpdateInCollection = require('./collections/UpdateInCollection');

module.exports = {
    Authenticate,
    CreateCollection,
    InsertInCollection,
    DeleteInCollection,
    GetInCollection,
    UpdateInCollection
}