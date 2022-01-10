const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model_name: {
        type: String,
    },
    price_in_eur: {
        type: mongoose.Schema.Types.Number
    },
    percentage: {
        type: mongoose.Schema.Types.Number
    }
});

module.exports = Car = mongoose.model("Car", carSchema);