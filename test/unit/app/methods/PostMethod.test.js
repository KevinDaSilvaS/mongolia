const app = require('../../../../src/app/app');
const {POST} = require('../../../../src/app/methods/');
const buildBase = jest.fn();

const route = {
    route: '/route',
    validations: {},
    controller: ({}, res = {send: jest.fn()}) => res.send()
} 

describe('Sucess', () => {
    test('Should have call getRoute successfully', async () => {
        const result = await POST(app, route, buildBase);

        const appendedRoute = result._router.stack          
        .filter(routeObject => routeObject.route)  
        .map(routeObject => routeObject.path);

        const appRoute = app._router.stack          
        .filter(routeObject => routeObject.route)  
        .map(routeObject => routeObject.path);

        expect(appendedRoute).toEqual(appRoute);
    });

});