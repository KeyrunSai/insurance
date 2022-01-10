const env = require('dotenv').config();

module.exports = {
    loginAPI: "http://localhost:1234/api/login",
    carsAPI: "http://localhost:1234/api/cars",
    user: process.env.TEST_USERNAME || 'user',
    pwd: process.env.TEST_PASSWORD || 'pwd'
}