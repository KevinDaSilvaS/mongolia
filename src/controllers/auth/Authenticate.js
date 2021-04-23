const execute = async (req, res, dependencies) => {
    const { response, manager, Status, ErrorMessages } = dependencies;
    const {token} = manager;

    try {
        if(token.token){
            return response(res, Status.BAD_REQUEST, ErrorMessages.ERROR_AUTHENTICATING);
        }

        const { username, password } = req.body;
        if(token.username == username && token.password == password){
            const mongolia_auth_token = manager.token.createToken();

            manager.token.token = mongolia_auth_token;

            return response(res, Status.CREATED, {
                mongolia_auth_token
            });
        }
        return response(res, Status.BAD_REQUEST, ErrorMessages.ERROR_AUTHENTICATING);
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;