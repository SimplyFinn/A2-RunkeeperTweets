const writtenArray = new Array();

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

	for(let i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].written) {
			if(tweet_array[i].writtenText != " ") {
				writtenArray.push(tweet_array[i]);
			}
		}
	}
	//TODO: Filter to just the written tweets
}


function addEventHandlerForSearch() {
	//this updates the data above the table
	const search = document.getElementById('textFilter');
	
	var phrase;

	search.addEventListener('keyup', function(e) {
		var phraseCount = 0;

		phrase = e.target.value.toLowerCase();
		console.log(phrase);

		for(let i = 0; i < writtenArray.length; i++) {
			

			//this adds to the count as well as updating the DOM
			if(writtenArray[i].writtenText.toLowerCase().includes(phrase)) {
				phraseCount += 1;
				document.getElementById('searchCount').innerText = phraseCount;
				document.getElementById('searchText').innerText = phrase;
			}

			//this resets the tweet match if there is nothing in the field
			if(phrase == '') {
				phraseCount = 0;
				document.getElementById('searchCount').innerText = phraseCount;
				document.getElementById('searchText').innerText = phrase;
			}
		}

		//this updates the actual table
		if(phrase != '') {
			filteredWrittenTweets = writtenArray.filter(function(t) {
				return t.writtenText.includes(phrase);
			});

			$('#tweetTable').empty();

			for(let i = 0; i < filteredWrittenTweets.length; i++) {
				$('#tweetTable').append(filteredWrittenTweets[i].getHTMLTableRow(i + 1));
			}
		}

		else{
			$('#tweetTable').empty();
		}
	});
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});