'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./data/weather.json');
const movieKey = process.env.MOVIE_API_KEY;
// const Movie = require('./Movie.js');
const axios = require('axios');
const PORT = process.env.PORT || 3002;




const app = express();
app.use(cors());



app.get('/weather', (request, response, next) => {
  const { searchQuery } = request.query;
  // console.log(request.query, db);
  if (!request.query.searchQuery) {
    next('Please enter location');
  } else {
    let foundCity = db.find(city => city.city_name.toLowerCase === searchQuery.toLowerCase);
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

app.get('/movie', getMovie)
async function getMovie(request, response) {
  console.log('movie function');
  try {
    let movieQuery = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;
    console.log(url);
    let cityMovie = await axios.get(url);
    let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
    console.log(movieArray);
    response.send(movieArray);
  } catch (error) {
    response.send(error.message);
  }
};

//   else {
//     let movieArray = cityMovie.data.map(movie => new Movie(movie.title, movie.overview));
//     response.send(movieArray);
//   }
//   let selectMovie = cityMovie.data.map(dayMovie => {
//     return new Movie(dayMovie);
//   });

//   response.send(selectMovie);
// });





class Forecast {
  constructor(day) {
    console.log(day);
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}
class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    // this.overview = overview;
  }
}



app.use('*', (request, response) => {
  response.status(404).send('invalid request');
});


app.listen(PORT, () => console.log('listening on' + PORT));


