'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const getWeather = require('./weather');
const getMovie = require('./movie');




const app = express();
app.use(cors());



app.get('/weather', getWeather );

app.get('/movies', getMovie);




app.use('*', (request, response) => {
  response.status(404).send('invalid request');
});


app.listen(PORT, () => console.log('listening on' + PORT));


