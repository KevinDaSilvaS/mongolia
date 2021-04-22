const app = require('./app');
const routes = require('../routes/routes');
const {BuildBase, ...HttpMethods} = require('./methods/');

routes.map((route) => {
    HttpMethods[route.method](app, route, BuildBase);
});