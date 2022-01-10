const loginService = require('../services/login.service');
const carsService = require('../services/cars.service');

const login = async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let status = await loginService.validateLogin(login, password);
    return status;
}

const cars = async (req, res) => {
    return await carsService.getCars();
}

module.exports = {
    login,
    cars
}