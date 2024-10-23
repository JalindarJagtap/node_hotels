const express = require('express');
app = express();
const db = require('./db');
const passport = require('./auth');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// midddle ware function  call here

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} request made to :${req.originalUrl}`);
    next();
}
app.use(logRequest)

app.use(passport.initialize());
const localAuthMeddleWear = passport.authenticate('local', { session: false })
app.get('/', function (req, res) {
    res.send("welcome  world!");
});

// import the routes from  the here
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// use the routes   
app.use('/person', personRoutes);
app.use('/menu',  menuRoutes,)


app.listen(PORT, () => {
    console.log('server listening on port')
})  