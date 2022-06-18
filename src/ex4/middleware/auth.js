function auth(req, res, next) {
    let error = Error();
    error.statusCode = 403;
    error.message = "Not authorized";
    if (Object.keys(req.body['item']).length === 0) {
        throw error;
        ;
    }
    next();
};

export {auth}