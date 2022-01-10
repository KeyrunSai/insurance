const Login = require('../models/login.model');

const validateLogin = (login, password) => {
    return Login.find(
        // Find documents matching any of these values
        {
            $and:
                [
                    {
                        "login": login
                    },
                    {
                        "password": password
                    }
                ]
        }
    )
    .then(result => {
        console.log('Found entry: ' + result.length);
        if(result.length > 0) {
            return true;
        }
        else
            throw new Error('No login found in Database');
    })
    .catch(err => {
        console.log(`${err}`);
        return false;
    });

}

module.exports = {
    validateLogin
}