const { apiService } = require('../services/api.service');

describe('Check for Login', () => {
    test('should login', async () => {
        let loginStatus = await apiService.validateLogin('Qover', 'Ninja');
        expect(loginStatus).toBe(true);
    })
    test('should not login',  async () => {
        let loginStatus = await apiService.validateLogin('ab', '123');
        expect(loginStatus).toBe(false);
    })
})

describe('Load Cars for quote', () => {
    test('should return at least 1 car', async () => {
        let cars = await apiService.getCars();
        expect(cars.length > 0).toBe(true);
    })
})