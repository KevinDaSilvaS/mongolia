const execute = async (req, res, dependencies) => {
    const { response, manager, Status } = dependencies;
    const {token} = manager;

    try {
        console.log(token);

        return response(res, Status.CREATED, {});
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;