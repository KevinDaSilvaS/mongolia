
const getRoute = (app, route, buildBase) => {
    return app.delete(route.route, async (req, res) => {
        await buildBase(route, req, res);
    });
}


module.exports = getRoute;