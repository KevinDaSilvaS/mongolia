const routes = [
    //auth
    {
        route: '/auth',
        validations: {},
        controller: undefined,
        method: 'POST'
    },

    //create collection
    {
        route: '/collections',
        validations: {},
        controller: undefined, 
        method: 'POST'
    },

    //perform operations in collection
    {
        route: '/collections/:collectionName',
        validations: {},
        controller: undefined, 
        method: 'POST'
    },

    {
        route: '/collections/:collectionName',
        validations: {},
        controller: undefined, 
        method: 'GET'
    },
    
    {
        route: '/collections/:collectionName',
        validations: {},
        controller: undefined, 
        method: 'PATCH'
    },

    {
        route: '/collections/:collectionName',
        validations: {},
        controller: undefined, 
        method: 'DELETE'
    },
];

module.exports = routes;