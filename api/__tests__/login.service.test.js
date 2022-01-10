const { validateLogin } = require('../services/login.service');
const mongoose = require('mongoose');

// Loading Configuration settings
const config = require('../config');

// Loading MongoDB URL
const dbURL = config.getDBURL();


beforeAll(async () => {
    // MongoDB connection
    await mongoose
    .connect(dbURL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Error connecting to MongoDB: ", err));
})
afterAll(async () => {
    await mongoose.connection.close();
})

describe('Group of tests to check Login', () => {
    it('should not allow login', async () => {
        let loginStatus = await validateLogin('ab', '123');
        expect(loginStatus).toBe(false);
    })
    it('should allow login', async () => {
        let loginStatus = await validateLogin('Qover', 'Ninja');
        expect(loginStatus).toBe(true);
    })
    it('should allow login', async () => {
        let loginStatus = await validateLogin(undefined, undefined);
        expect(loginStatus).toBe(false);
    })
})