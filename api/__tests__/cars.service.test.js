const { getCars } = require('../services/cars.service');
const mongoose = require('mongoose');
const Car = require('../models/car.model');
const testDataForCars = require('./data/cars.json');

// Loading Configuration settings
const config = require('../config');

// Loading MongoDB URL
const dbURL = config.getDBURL();


beforeAll(async () => {
    // MongoDB connection
    await mongoose.connect(dbURL);
    let cars = await getCars();
    if(cars.length === 0) {
        await Car.insertMany(testDataForCars);
    }
})
afterAll(async () => {
    let cars = await getCars();
    if(cars.length === 0) await Car.insertMany(testDataForCars);
    await mongoose.connection.close();
})

describe('Group of tests to check Cars', () => {
    it('should return at least 1 car', async () => {
        let cars = await getCars();
        expect(cars.length > 0).toBe(true);
    })
    
    it('should return 0 cars', async () => {
        await Car.collection.drop();
        let cars = await getCars();
        expect(cars.length).toBe(0);
    })
})