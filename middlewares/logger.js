const log = (req, res, next) => {
    console.log(req.method, req.url,);
    next(); // pass the control to the next middleware function
};

module.exports = log;