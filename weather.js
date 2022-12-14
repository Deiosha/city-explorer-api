const  axios = require("axios");

const cache = {};


const getWeather = async (request, response, next) => {
  const { searchQuery } = request.query;
  if (cache[searchQuery]) {
    console.log('hit');
  } else {
    if (!request.query.searchQuery) {
      next('Please enter location');
    } else {
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=6&city=${searchQuery}`
      let cityForecast = await axios.get(url)
      // console.log(cityForecast);
      let dayArray = cityForecast.data.data;
      let forecastArray = dayArray.map(day => new Forecast(day));
      console.log(forecastArray);
      console.log('miss');
  
     
      cache[searchQuery] = forecastArray;
  
    }
  }
  response.send(cache[searchQuery]);
}

class Forecast {
  constructor(day) {
    console.log(day);
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;