const routes = [
    //auth
    {
        route: '/auth',
        validations: {},
        controller: (req, res) => res.send({works: true}),
        method: 'POST'
    },

    //create collection
    {
        route: '/collections',
        validations: {},
        controller: (req, res) => res.send({works: true}), 
        method: 'POST'
    },

    //perform operations in collection
    {
        route: '/collections/:collectionName',
        validations: {},
        controller: (req, res) => res.send({works: true}), 
        method: 'POST'
    },

    {
        route: '/collections/:collectionName',
        validations: {},
        controller: (req, res) => res.send({works: true}), 
        method: 'GET'
    },
    
    {
        route: '/collections/:collectionName',
        validations: {},
        controller: (req, res) => res.send({works: true}), 
        method: 'PATCH'
    },

    {
        route: '/collections/:collectionName',
        validations: {},
        controller: (req, res) => res.send({works: true}), 
        method: 'DELETE'
    },
];

module.exports = routes;