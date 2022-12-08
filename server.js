'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./data/weather.json');


const app = express();
app.use(cors());



app.get('/weather', (request, response, next) => {
  const { searchQuery } = request.query;
  // console.log(request.query, db);
  if (!request.query.searchQuery) {
    next('Please enter location');
  } else {
    let foundCity = db.find(city => city.city_name === searchQuery);
    // console.log(foundCity);
    let dayArray = foundCity.data;
    let forecastArray = dayArray.map(day => new Forecast(day));
    console.log(forecastArray);

    // for (let i = 0; i < db.length; i++){
    //   if (request.query.lon === db[i].lon){
    //     weather = db[i].lon;
    //   }
    // }
    response.send(forecastArray);

  }

});

class Forecast {
  constructor(day) {
    console.log(day);
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}


const PORT = process.env.PORT||3002;

app.use('*', (request, response, next) => {
  response.status(404).send('invalid request');
});


app.listen(PORT, () => console.log('listening on' + PORT));


