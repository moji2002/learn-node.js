const log = (req, res, next) => {
    console.log('logging...');
    next(); // pass the control to the next middleware function
};

module.exports = log;