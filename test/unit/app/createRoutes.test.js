const app = require('../../../src/app/app');
require('../../../src/app/createRoutes');

const routes = app._router.stack          
  .filter(routeObject => routeObject.route)  
  .map(routeObject => {
    const { path, stack } = routeObject.route;
    const [ method ] = stack.map(layer => layer.method);
    return { path, method };
});

test('Should assert all routes and methods on microservice', () => {
    expect(routes).toEqual([
        { path: '/auth', method: 'post' },
        { path: '/collections', method: 'post' },
        { path: '/collections/:collectionName', method: 'post' },
        { path: '/collections/:collectionName', method: 'get' },
        { path: '/collections/:collectionName', method: 'patch' },
        { path: '/collections/:collectionName', method: 'delete' }
      ]);
});