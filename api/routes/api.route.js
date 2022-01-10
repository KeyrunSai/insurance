const apiController = require('../controllers/api.controller');
const router = require('express').Router();

router.route('/login').post(async (req, res, next) => {
    try {
        let status = await apiController.login(req, res);
        res.status(202).json({loginStatus: status});
    } catch (error) {
        return next(error);
    }
});

router.route('/cars').get(async (req, res, next) => {
    try {
        let cars = await apiController.cars(req, res);
        if(cars != undefined && cars.length > 0) {
            res.status(202).json(cars);
        }
        else{
            res.status(404).json(cars);
        }
    } catch (error) {
        return next(error);
    }
});


module.exports = router;