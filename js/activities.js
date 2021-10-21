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
	
	// IT ENDS HERE ---------------------------------------------

	//this gets the average of the days
	var mon = 0.0;
	var tues = 0.0;
	var wed = 0.0;
	var thurs = 0.0;
	var fri = 0.0;
	var sat = 0.0;
	var sun = 0.0;
	var countMon = 0;
	var countTues = 0;
	var countWed = 0;
	var countThurs = 0;
	var countFri = 0;
	var countSat = 0;
	var countSun = 0;


	for(let i = 0; i < completedArray.length; i++) {
		var tempString;

		tempString = (completedArray[i].time).toString();

		if(tempString.includes('Mon')) {
			mon += completedArray[i].distance;
			countMon += 1;
		}

		else if(tempString.includes('Tue')) {
			tues += completedArray[i].distance;
			countTues += 1;
		}

		else if(tempString.includes('Wed')) {
			wed += completedArray[i].distance;
			countWed += 1;
		}

		else if(tempString.includes('Thu')) {
			thurs += completedArray[i].distance;
			countThurs += 1;
		}

		else if(tempString.includes('Fri')) {
			fri += completedArray[i].distance;
			countFri += 1;
		}

		else if(tempString.includes('Sat')) {
			sat += completedArray[i].distance;
			countSat += 1;
		}

		else if(tempString.includes('Sun')) {
			sun += completedArray[i].distance;
			countSun += 1;
		}
	}

	var avgMon = parseFloat((mon / countMon).toFixed(2));
	var avgTues = parseFloat((tues / countTues).toFixed(2));
	var avgWed = parseFloat((wed / countWed).toFixed(2));
	var avgThurs = parseFloat((thurs / countThurs).toFixed(2));
	var avFri = parseFloat((fri / countFri).toFixed(2));
	var avgSat = parseFloat((sat / countSat).toFixed(2));
	var avgSun = parseFloat((sun / countSun).toFixed(2));

	//this gets the longest and shortest of the top 3 activities
	var mostFirst = 0;
	var leastFirst = Infinity;
	var mostSecond = 0;
	var leastSecond = Infinity;
	var mostThird = 0;
	var leastThird = Infinity;

	for(let i = 0; i < completedArray.length; i++) {
		if(completedArray[i].activityType == items[0][0]) {
			if(completedArray[i].distance > mostFirst) {
				mostFirst = completedArray[i].distance;
			}

			if(completedArray[i].distance < leastFirst) {
				leastFirst = completedArray[i].distance;
			}
		}

		if(completedArray[i].activityType == items[1][0]) {
			if(completedArray[i].distance > mostSecond) {
				mostSecond = completedArray[i].distance;
			}

			if(completedArray[i].distance < leastSecond) {
				leastSecond = completedArray[i].distance;
			}
		}

		if(completedArray[i].activityType == items[2][0]) {
			if(completedArray[i].distance > mostThird) {
				mostThird = completedArray[i].distance;
			}

			if(completedArray[i].distance < leastThird) {
				leastThird = completedArray[i].distance;
			}
		}
	}

	console.log(mostFirst, 'a');
	console.log(leastFirst, 'b');
	console.log(mostSecond, 'c');
	console.log(leastSecond, 'd');
	console.log(mostThird, 'e');
	console.log(leastThird, 'f');
	

	document.getElementById('numberActivities').innerText = Object.keys(unique).length;
	document.getElementById('firstMost').innerText = items[0][0];
	document.getElementById('secondMost').innerText = items[1][0];
	document.getElementById('thirdMost').innerText = items[2][0];


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {"values": tweet_array},
	  "mark": "point",
	  "encoding": {
			"x": {"field": "time", "type": "temporal", "timeUnit": "day"},
			"y": {"field": "Mean of Distance", "type": "quantitative", "aggregate": "mean"}
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