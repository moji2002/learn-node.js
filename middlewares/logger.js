const log = (req, res, next) => {
    // console.log('logger:' , req.body);
    next(); // pass the control to the next middleware function
};

module.exports = log;