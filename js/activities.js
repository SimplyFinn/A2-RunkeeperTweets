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
		allActivity.push(completedArray[i].activityType)
	}

	//this puts it all into a unique dictionary
	var unique = {};

	for(let i = 0; i < allActivity.length; i++) {
		unique[allActivity[i]] = unique[allActivity[i]] ? unique[allActivity[i]] + 1 : 1;
	}

	document.getElementById('numberActivities').innerText = Object.keys(unique).length - 1;

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