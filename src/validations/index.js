const models = require('./models/');
const routes = require('./routes/');

module.exports = {
    ...models,
    ...routes
}