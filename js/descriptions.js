const writtenArray = new Array();
const activities = new Array();

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
				activities.push(tweet_array[i].activityType);
				writtenArray.push(tweet_array[i].writtenText);
			}
		}
	}
	//TODO: Filter to just the written tweets
}


function addEventHandlerForSearch() {
	//this updates the data above the table
	const search = document.getElementById('textFilter');
	const table = document.getElementById('tweetTable');

	var phrase;
	var phraseCount = 0;

	search.addEventListener('keyup', function(e) {
		phrase = e.target.value.toLowerCase();

		for(let i = 0; i < writtenArray.length; i++) {
			if(writtenArray[i].toLowerCase().includes(phrase)) {
				console.log(phraseCount);
				phraseCount += 1;
				document.getElementById('searchCount').innerText = phraseCount;
				document.getElementById('searchText').innerText = phrase;
				console.log(typeof phrase);
			}

			if(phrase == '') {
				phraseCount = 0;
				document.getElementById('searchCount').innerText = phraseCount;
				document.getElementById('searchText').innerText = phrase;
			}

			// table.innerHTML += '
			// 	<tr>
			// 		<td>${i + 1} </td>
			// 		<td>${activities[i]} </td>
			// 		<td>${writtenArray[i]} </td>
			// 	</tr>
			// ';
		}
	});

	//this updates the actual table
	


	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});