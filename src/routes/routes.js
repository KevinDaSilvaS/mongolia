const validations = require('../validations/');

const routes = [
    //auth
    {
        route: '/auth',
        validations: {
            validateAuthPostBody: validations.validateAuthPostBody
        },
        controller: (req, res) => res.send({works: true}),
        method: 'POST'
    },

    //create collection
    {
        route: '/collections',
        validations: {
            authToken: validations.validateAuthToken,
            createCollectionPostBody: validations.validateCreateCollectionBody
        },
        controller: (req, res) => res.send({works: true}), 
        method: 'POST'
    },

    //perform operations in collection
    {
        route: '/collections/:collectionName',
        validations: {
            authToken: validations.validateAuthToken
        },
        controller: (req, res) => res.send({works: true}), 
        method: 'POST'
    },

    {
        route: '/collections/:collectionName',
        validations: {
            authToken: validations.validateAuthToken,
            pagination: validations.validatePagination
        },
        controller: (req, res) => res.send({works: true}), 
        method: 'GET'
    },
    
    {
        route: '/collections/:collectionName',
        validations: {
            authToken: validations.validateAuthToken
        },
        controller: (req, res) => res.send({works: true}), 
        method: 'PATCH'
    },

    {
        route: '/collections/:collectionName',
        validations: {
            authToken: validations.validateAuthToken
        },
        controller: (req, res) => res.send({works: true}), 
        method: 'DELETE'
    },
];

module.exports = routes;