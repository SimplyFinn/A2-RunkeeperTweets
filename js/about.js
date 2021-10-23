const format = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var live = 0, achiev = 0, compl = 0, misc = 0, user = 0;

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//counts the number of event types	
	for(let i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].source == 'live_event') {
			live += 1;
		}

		else if(tweet_array[i].source == 'achievement') {
			achiev += 1;
		}

		else if(tweet_array[i].source == 'completed_event') {
			compl += 1;
			if(tweet_array[i].written) {
				user += 1;
			}
		}

		else {
			misc += 1;
		}
	}

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length - 1].time.toLocaleDateString(undefined, format);
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString(undefined, format);
	
	var complList = document.querySelectorAll('.completedEvents');
	for(let i = 0; i < complList.length; i++) {
		complList[i].innerHTML = compl;
	}
	var complPercent = (compl / tweet_array.length) * 100;
	document.querySelector('.completedEventsPct').innerHTML = complPercent.toFixed(2) + '%';

	document.querySelector('.liveEvents').innerHTML = live;
	var livePercent = (live / tweet_array.length) * 100;
	document.querySelector('.liveEventsPct').innerHTML = livePercent.toFixed(2) + '%';

	document.querySelector('.achievements').innerHTML = achiev;
	var achievPercent = (achiev / tweet_array.length) * 100;
	document.querySelector('.achievementsPct').innerHTML = achievPercent.toFixed(2) + '%';

	document.querySelector('.miscellaneous').innerHTML = misc;
	var miscPercent = (misc / tweet_array.length) * 100;
	document.querySelector('.miscellaneousPct').innerHTML = miscPercent.toFixed(2) + '%';

	document.querySelector('.written').innerHTML = user;
	var writtenPercent = (user / compl) * 100;
	console.log(user);
	document.querySelector('.writtenPct').innerHTML = writtenPercent.toFixed(2) + '%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});