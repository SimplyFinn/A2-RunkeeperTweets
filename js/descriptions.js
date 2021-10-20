function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//originial array
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	console.log(tweet_array[3].text);
	console.log(tweet_array[3].writtenText);

	var writtenArray = new Array();

	for(let i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].written) {
			if(tweet_array[i].writtenText != " ") {
				writtenArray.push(tweet_array[i].writtenText);
			}
		}
	}

	console.log(writtenArray);
	//TODO: Filter to just the written tweets
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});