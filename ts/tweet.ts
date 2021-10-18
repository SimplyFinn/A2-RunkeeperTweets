class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if(this.text.startsWith('Just completed') || this.text.startsWith('Just posted')) {
            return 'completed_event';
        }

        else if(this.text.startsWith('Achieved')) {
            return 'achievement';
        }

        else if(this.text.startsWith('Watch my')) {
            return 'live_event';
        }

        else {
            return 'miscellaneous';
        }
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.includes('- Tom')) {
            return false;
        }

        else if(this.text.includes('- ')) {
            return true;
        }

        else {
            return false;
        } 
    }

    get writtenText():string {
        if(!this.written) {
            var hasHttps = this.text.split('-');
            var noHttps = hasHttps[1];
            var end = noHttps.split('https');
            var user = end[0].slice(1, end[0].length - 1);

            return user;
        }

        else {
            return " ";
        }
        //TODO: parse the written text from the tweet
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }

        else {
            if(this.text.includes(' in ')) {
                let splitted = this.text.split(' in ');
                let temp = splitted[1].split(' ');
                let tempNum = parseInt(temp[temp.length - 2]);
            }    

            else if(this.text.includes('mi')) {
                let splitted = this.text.split('mi');
                let temp = splitted[1].split(' ');
                return temp[1];
            }

            else {
                let splitted = this.text.split('km');
                let temp = splitted[1].split(' ');
                return temp[1];
            }
        }
        //TODO: parse the activity type from the text of the tweet
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        else {
            if(this.text.includes('in ')) {
                let splitted = this.text.split('in ');
                let temp = splitted[1].split(' ');
                let tempNum = parseInt(temp[temp.length - 2]);
                return tempNum;
            }

            else if(this.text.includes('mi')) {
                let splitted = this.text.split('mi');
                let temp = splitted[0].split(' ');
                let tempNum = parseInt(temp[temp.length - 2]);
                return tempNum;
            }

            else {
                let splitted = this.text.split('km');
                let temp = splitted[0].split(' ');
                let tempNum = parseInt(temp[temp.length - 2]);
                let converted = tempNum / 1.609;
                return converted;
            }
        }
        //TODO: prase the distance from the text of the tweet
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}