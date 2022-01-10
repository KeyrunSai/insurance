const Car = require('../models/car.model');

const getCars = () => {
    return Car.find({})
        .then(cars => {
            if (cars.length > 0) {
                console.log(`Found cars: ${cars.length}`);
                return cars;
            }
            else
                throw new Error('No cars found');
        })
        .catch(err => {
            console.log(`${err}`);
            return [];
        });
}

module.exports = {
    getCars
}