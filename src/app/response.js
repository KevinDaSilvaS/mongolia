module.exports = (res, code, details) => {
    return res.status(code).send({code, details});
}