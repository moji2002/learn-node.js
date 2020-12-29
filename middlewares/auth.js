const auth = (req, res, next) => {
    console.log('checking authentication');
    next();
};

module.exports = auth;