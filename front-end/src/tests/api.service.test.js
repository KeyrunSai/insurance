const { apiService } = require('../services/api.service');
const config = require('../config');
const user = config.user;
const pwd = config.pwd;

describe('Check for Login', () => {
    test('should login', async () => {
        let loginStatus = await apiService.validateLogin(user, pwd);
        expect(loginStatus).toBe(true);
    })
    test('should not login',  async () => {
        let loginStatus = await apiService.validateLogin('ab', '123');
        expect(loginStatus).toBe(undefined);
    })
})

describe('Load Cars for quote', () => {
    test('should return at least 1 car', async () => {
        let cars = await apiService.getCars();
        expect(cars.length > 0).toBe(true);
    })
})