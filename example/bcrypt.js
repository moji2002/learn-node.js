const bcrypt = require("bcrypt");

const run = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('123456',salt) // we can store this value in the db
    const isValid = await bcrypt.compare('123456',hashedPass) // password validation
    console.log(salt);
    console.log(hashedPass,hashedPass.length);
    console.log(isValid);
};

run()
