const buildBase = require('../../../../src/app/methods/BuildBase');

const res = {
    send: jest.fn(),
};

const route = {
    validations: {},
    controller: (req, res) => res.send()
}

describe('Sucess', () => {
    test('Should have call buildBase successfully with no validations', async () => {
        await buildBase(route, {}, res);
        expect(res.send).toHaveBeenCalled();
    });

    test('Should have call buildBase successfully with one valid validation', async () => {
        route.validations.validation = () => true;
        const result = await buildBase(route, {}, res);
        expect(result).toEqual(undefined);
        expect(res.send).toHaveBeenCalled();
    });
});

describe('Fail', () => {

    test('Should have call buildBase and fail on validations stage', async () => {
        route.validations.validation = () => false;
        route.controller = jest.fn();

        const result = await buildBase(route, {}, res);
        expect(result).toEqual(undefined);
        expect(route.controller).not.toHaveBeenCalled();
    });
});