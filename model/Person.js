const mongoose = require('mongoose');

// Define the person schema 
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,

    },
    age: {
        type: Number,

    },
    work: {
        type: String,
        enum: ["chef", "waiters", "managers"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    sallary: {
        type: Number,
        required: true,
    }
});


//Difine the model here

const Person = mongoose.model('person',PersonSchema);
module.exports =Person;