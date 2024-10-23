const mongoose = require('mongoose');
require('dotenv').config();

// define the mongodb connection  Url
 const mongoURL = process.env.MOGODB_URL_LOCAL;/// replace  the url local

//const mongoURL = process.env.MONGODB_URL; // this is atlas  server URL
  

mongoose.connect(mongoURL, {});

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
