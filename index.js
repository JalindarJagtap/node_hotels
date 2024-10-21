const express = require('express');
app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;



const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// use the routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes)



app.get('/', (req, res) => {
    res.send("welcome  world!");
});

app.listen(PORT, () => {
    console.log('server listening on port')
})  