const log =  (req, res, next) => {
    console.log('logging...');
    next(); // pass the controll to the next middle ware function
};


module.exports = log;