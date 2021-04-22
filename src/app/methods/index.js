const GetMethod = require('./GetMethod');
const PostMethod = require('./PostMethod');
const PatchMethod = require('./PatchMethod');
const DeleteMethod = require('./DeleteMethod');
const BuildBase = require('./BuildBase');

module.exports = {
    GET: GetMethod,
    POST: PostMethod,
    PATCH: PatchMethod,
    DELETE: DeleteMethod,
    BuildBase
}