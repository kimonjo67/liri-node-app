require("dotenv").config();

// console.log(process.env);

//Grab Data from keys.js
var keys = require('./keys.js');
// Twitter
var Twitter = require('twitter');
// Spotify
var Spotify = require('node-spotify-api');
//  Request
var Request = require('request');

var fs = require('fs');
  
var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

//Argument Command line Array
var nodeArgv = process.argv;
var command = process.argv[2];

//Movie or song

var input = "";

//Loop all the words in the node argument
//and do a little of a loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgv.length; i++) {
	if (i > 2 && i < nodeArgv.length) {
		input = input + "+" + nodeArgv[i];
	}
	else {
		input += nodeArgv[i];
	}
}

console.log(input);


function displayTweet() {

// Twitter Get Methods
client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;

  for (var i = 0; i < tweets.length; i++) {
  	var twit = tweets[i].created_at;
  	var name = tweets[i].user.screen_name;
  	var text = tweets[i].text;
  	console.log(" TWITTER")
  	console.log(" -----")
  	console.log(name + ": " + text + " " + "Tweeted on" + " " + twit);  // The favorites.
  	console.log("------------------------");
	}
});
};

// var params = {
// 	q: 'obama',
// 	count: 1
// }
// var screenName ={screen_name: 'SamTestNodeApp18'};

// client.get('search/tweets', params, gotData);

// function gotData(err, data, response) {
// 	for (var i = 0; i < data.length; i++) {
//      var tweets = data[i].statuses[i].text;
// 	console.log(tweets);
// 	}	
// }


// client.get(https://api.twitter.com/1.1/favorites/list.json?count=20&screen_name=episod)

function displaySpotify() {
	spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  	}

  	for (var i = 0; i < data.tracks.items.length; i++) {
  		var songs = data.tracks.items[i].album.artists[i].name;
  		var album = data.tracks.items[i].album.name;
  		var songdata = data.tracks.items[i].name;
  		var link = data.tracks.items[i].uri;
  	console.log(" SPOTIFY")
  	console.log(" -----")
 	console.log("Track Name:" + " " + songdata + " " +"Artist" + ": " + songs + " " + "Album Name" + ": " + link + " " + "Album Title" + " "+ album);
 	console.log("----------------------------------------")
	}
})	
};

// TO BE WORKED ON... PENDING BELOW >>>>>>>>>>>>>>>>
// add  query method and for loops 
function displayMovie() {
	// We then run the request module on a URL with a JSON
Request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
}

displayTweet();
displaySpotify();
displayMovie();








