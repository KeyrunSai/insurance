const env = require('dotenv').config();

module.exports = {
    getPort : () => {
        return (process.env.PORT || 8080);
    },
    getFrontEndURL : () => {
        return (process.env.FRONTEND_URL || 'http://localhost:3000');
    },
    getDBURL : () => {
        return (process.env.MONGODB_URL || 'mongodb://localhost');
    },
    getUser : () => {
        return (process.env.TEST_USERNAME || 'user')
    },
    getPwd: () => {
        return (process.env.TEST_PASSWORD || 'pwd')
    }
}