function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//this gets the completed events array
	var completedArray = new Array();
	var other = 0;

	for(let i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].source == 'completed_event') {
			completedArray.push(tweet_array[i]);
		}

		else {
			other += 1;
		}
	}

	//this puts all the activities in a huge array
	var allActivity = new Array();

	for(let i = 0; i < completedArray.length; i++) {
		if(completedArray[i].activityType != 'timed') {
			allActivity.push(completedArray[i].activityType);
		}

		else {
			//pass;
		}
	}

	//this puts it all into a unique dictionary
	var unique = {};

	for(let i = 0; i < allActivity.length; i++) {
		unique[allActivity[i]] = unique[allActivity[i]] ? unique[allActivity[i]] + 1 : 1;
	}

	//BORROWED CODE FOR A SORTING ALGORITHM -----------------------
	//HERE IS THE LINK https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
		// Create items array
	var items = Object.keys(unique).map(function(key) {
		return [key, unique[key]];
	});
	
	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});
	
	// Create a new array with only the first 5 items
	console.log(items.slice(0, 5));
	// IT ENDS HERE ---------------------------------------------

	document.getElementById('numberActivities').innerText = Object.keys(unique).length;
	document.getElementById('firstMost').innerText = items[0][0];
	document.getElementById('secondMost').innerText = items[1][0];
	document.getElementById('thirdMost').innerText = items[2][0];


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});