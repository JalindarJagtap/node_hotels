const mongoose = require('mongoose');


const menuItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    teast: {
        type: String,
        enum: ["spicy", "sweet", "sour"],
        required: true


    }, price: {
        type: Number,
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredianent: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0

    }

});

const MenuItem = mongoose.model("menuItem", menuItemSchema);

module.exports = MenuItem 