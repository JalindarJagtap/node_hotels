const mongoose = require('mongoose');

// define the mongodb connection  Url
const mongooseURL = 'mongodb://localhost:27017/Hotel';


//setup the mongodb connection 

mongoose.connect(mongooseURL, {

});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb server');
});
db.on('error', (error) => {
    console.log("mongodb connection error ", error);
});
db.on('disconncetd', () => {
    console.log("disconnceted to mongodb server");
});

module.exports = db;
