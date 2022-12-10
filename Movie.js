const  axios = require("axios");

const cache = {};

async function getMovie(request, response) {
  console.log('movie function');
  
  try {
    let movieKey = process.env.MOVIE_API_KEY;
    let movieQuery = request.query.searchQuery;
    let key = 'movie' + movieQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;
    console.log(url);
    if (cache[key]&& (Date.now() - cache[key].timestamp < 50000)){
      console.log('cache hit');
    } else {
      console.log('cache miss');
      cache[key]={}
      let cityMovie = await axios.get(url);
      console.log(cityMovie.data.results);
      cache[key].data = cityMovie.data.results.map(movie => new Movie(movie));
    }
    console.log(cache[key].data);
    response.send(cache[key].data);
  } catch (error) {
    response.send(error.message);
  }
};

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.popularity= movieObj.popularity;
    // this.overview = overview;
  }
}

module.exports = getMovie;
