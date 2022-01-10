const mongoose = require('mongoose');

// Loading Configuration settings
const config = require('../config');

// Loading MongoDB URL
const dbURL = config.getDBURL();


beforeAll(async () => {
    // MongoDB connection
    await mongoose.connect(dbURL);
})
afterAll(async () => {
    await mongoose.connection.close();
})

it('should connect to database', async () => {
    let readyState = mongoose.connection.readyState; // 1 - connected
    expect(readyState).toBe(1);
})

it('should not connect to database', async () => {
    await mongoose.connection.close();
    let readyState = mongoose.connection.readyState; // 0 - disconnected
    expect(readyState).toBe(0);
})