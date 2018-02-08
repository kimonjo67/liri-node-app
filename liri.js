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
var commandArg = process.argv[3];

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


//Use Switch statements for inout commands

switch (command) {
    case "my-tweets" :
    console.log("TWEETING!!!!!");
    displayTweet();
    break;

    case "spotify-this":
      displaySpotify(commandArg);
      console.log("SPOTIFY HERE");
    break;

    case "movie-this":
    console.log("MOVIE TIME");
    displayMovie(commandArg);
    break;

    case "do-what-it-says":
    console.log("What it says");
    doThing(commandArg);
    break;

 default:
    console.log("Command not found");

};

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
  	console.log("----------------------------");
    console.log("----------------------------------");
    console.log("-----------------------------------------");

	}
});
};

function displaySpotify(input) {
	spotify.search({ type: 'track', query: input, limit: 20 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  	}

  	for (var i = 0; i < data.tracks.items.length; i++) {
  		var songs = data.tracks.items[i].album.artists[i].name;
  		var album = data.tracks.items[i].album.name;
  		var songdata = data.tracks.items[i].name;
  		var link = data.tracks.items[i].uri;
  	console.log(" SPOTIFY")
  	console.log(" <><><><><><><><><><><><><><><><")
 	console.log("Track Name:" + " " + songdata + " " +"Artist" + ": " + songs + " " + "Album Name" + ": " + link + " " + "Album Title" + " "+ album);
  console.log(" <><><><><><><><><><><><><><><><><><><><><><")
 	console.log("----------------------------------------")
	}
})	
};

// TO BE WORKED ON... PENDING BELOW >>>>>>>>>>>>>>>>
// add  query method and for loops 
function displayMovie(input) {
	// We then run the request module on a URL with a JSON
Request("http://www.omdbapi.com/?t=" +input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("Title" + " " +JSON.parse(body).Title);
    console.log("Year" + " " +JSON.parse(body).Year);
    console.log("Country" +" " + JSON.parse(body).Country);
    console.log("Actors" + " " + JSON.parse(body).Actors);
    console.log("Language" + " " + JSON.parse(body).Language);
    console.log("IMDB RATING" + " " + JSON.parse(body).imdbRating);
    console.log("Plot" + " " + JSON.parse(body).Plot);
  }
});
};

function doThing() {
  // body...
fs.readFile("random.txt", "utf8", function (error, data) {
  if (error) {
    return console.log("Error");
  }

  var dataArr = data.split(",");
  console.log(dataArr);
  displaySpotify(dataArr);
});
}









