// const movieKey = process.env.MOVIE_API_KEY;
// const axios = require('axios');


// app.get('/movie', getMovie)
// async function getMovie(request, response) {
//   console.log('movie function');
//   try {
//     let movieQuery = request.query.searchQuery;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movieQuery}`;
//     console.log(url);
//     let cityMovie = await axios.get(url);
//     let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
//     console.log(movieArray);
//     response.send(movieArray);
//   } catch (error) {
//     response.send(error.message);
//   }
// };


// class Movie {
//   constructor(movieObj) {
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.popularity= movieObj.popularity;
//     // this.overview = overview;
//   }
// }
