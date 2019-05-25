require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// ----------------------Spotify search ---------------
// spotify-this-song
var spotifySearch = process.argv[2];
var query = process.argv[3] || "The Sign" ;
console.log(spotifySearch);

if (spotifySearch === 'spotify-this-song') {
spotify.search({ type: 'track', query: query }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var info = {
    'artist': data.tracks.items[0].artists[0].name,
    'Song name': data.tracks.items[0].name,
    'Link of the song': data.tracks.items[0].external_urls.spotify,
    'album': data.tracks.items[0].album.name,
    }
  console.log(info); 
});
}
//   Bands in Town-------------
// concert-this
var artist = process.argv[3];
var concert = process.argv[2];
console.log(artist);
console.log(concert);
var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

if (concert === 'concert-this') {
    axios.get(URL).then(function(response) {
    // concertInfo es un objeto
        var concertInfo = {
        'venue name': response.data[0].venue.name,
        'venue location': response.data[0].venue.city,
        'Event Date': response.data[0].datetime,
        }
        console.log(concertInfo);
        // console.log(response.data.date);
    });
}

// ------movie-this OMDbAPI
var movie = process.argv[3] || "Mr. Nobody" ;;
var searchMovie = process.argv[2];
console.log(movie);
console.log(searchMovie);

var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";
if (searchMovie === 'movie-this') {
    axios.get(URL).then(function(response) {
    // concertInfo es un objeto
        var movieInfo= {
        'Title of the movie': response.data.Title,
        'Year of the movie': response.data.Year,
        'IMDB Rating of the movie': response.data.Ratings.imdbRating,
        'Rotten Tomatoes Rating of the movie': response.data.Ratings.tomatoRating,
        'Country': response.data.Country,
        'Language of the movie': response.data.Language,
        'Plot of the movie': response.data.Plot,
        'Actors in the movie': response.data.Actors,
        }
        console.log(movieInfo);
    });
}



