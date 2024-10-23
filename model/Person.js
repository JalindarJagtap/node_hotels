const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    }, username: {
        type: String,
        required: true,

    }, password: {
        type: String,
        required: true,
    }
});



PersonSchema.pre('save', async function (next) {
    const person = this;  // 'this' refers to the document being saved
    
    // Check if the password field is modified before hashing
    if (!person.isModified('password')) return next();
    
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

PersonSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


//Difine the model here

const Person = mongoose.model('person', PersonSchema);
module.exports = Person;