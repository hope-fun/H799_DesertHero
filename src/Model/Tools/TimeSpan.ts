module Model {
	/**
	 *
	 * @author 
	 *
	 */
	export class TimeSpan {
    	
        private version: string = "1.2";
        // Millisecond-constants
        private msecPerSecond: number = 1000;
        private msecPerMinute:number = 60000;
        private msecPerHour: number= 3600000;
        private msecPerDay: number = 86400000;
        // Internally we store the TimeSpan as Milliseconds
        private msecs: number= 0;
        // Functions to interact with other TimeSpans
        private isTimeSpan:boolean = true;
        
        public constructor(milliseconds: number,seconds: number,minutes: number,hours: number,days: number) {
            // Constructor Logic
            if(this.isNumeric(days)) {
                this.msecs += (days * this.msecPerDay);
            }
            if(this.isNumeric(hours)) {
                this.msecs += (hours * this.msecPerHour);
            }
            if(this.isNumeric(minutes)) {
                this.msecs += (minutes * this.msecPerMinute);
            }
            if(this.isNumeric(seconds)) {
                this.msecs += (seconds * this.msecPerSecond);
            }
            if(this.isNumeric(milliseconds)) {
                this.msecs += milliseconds;
            }
		}
		
		/*
		 * Helper functions
		 */ 
        private isNumeric(input) { 
            return !isNaN(parseFloat(input)) && isFinite(input);
        }
        
        /*
         * Addition Functions
         */
        public addMilliseconds(milliseconds) { 
            if(!this.isNumeric(milliseconds)) {
                return;
            }
            this.msecs += milliseconds;
        }
        
        public addSeconds(seconds) { 
            if(!this.isNumeric(seconds)) { 
                return;
            }
            this.msecs += (seconds * this.msecPerSecond);
        }
        
        public addMinutes(minutes) { 
            if(!this.isNumeric(minutes)) { 
                return;
            }
            this.msecs += (minutes * this.msecPerMinute);
        }
        
        public addHours(hours) { 
            if(!this.isNumeric(hours)) {
                return;
            }
            this.msecs += (hours * this.msecPerHour);
        }
        
        public addDays(days) { 
            if(!this.isNumeric(days)) { 
                return;
            }
            this.msecs += (days*this.msecPerDay);
        }
        
        /*
         * Subtraction Functions
         */ 
        public subtractMilliseconds(milliseconds) { 
            if(!this.isNumeric(milliseconds)) { 
                return;
            }
            this.msecs -= milliseconds;
        }
        
        public subtractSeconds(seconds) { 
            if(!this.isNumeric(seconds)) { 
                return;
            }
            this.msecs -= (seconds * this.msecPerSecond);
        }
        
        public subtractMinutes(minutes) { 
            if(!this.isNumeric(minutes)) { 
                return;
            }
            this.msecs -= (minutes * this.msecPerMinute);
        }
        
        public subtractHours(hours) { 
            if(!this.isNumeric(hours)) { 
                return;
            }
            this.msecs -= (hours * this.msecPerDay);
        }
        
        public subtractDays(days) { 
            if(!this.isNumeric(days)) { 
                return;
            }
            this.msecs -= (days * this.msecPerDay);
        }
        
        /*
         * Functions to interact with other TimeSpans
         */ 
        public add(otherTimeSpan:TimeSpan) { 
            if(!otherTimeSpan.isTimeSpan) { 
                return;
            }
            this.msecs += otherTimeSpan.totalMilliseconds();
        }
        
        
        
        public subtract(otherTimeSpan: TimeSpan) { 
            if(!otherTimeSpan.isTimeSpan) { 
                return;
            }
            this.msecs += otherTimeSpan.totalMilliseconds();
        }
        
        public equals(otherTimeSpan: TimeSpan) { 
            if(!otherTimeSpan.isTimeSpan) { 
                return;
            }
            this.msecs === otherTimeSpan.totalMilliseconds();
        }
        
        /*
         * Getters
         */ 
        public totalMilliseconds(roundDown?) { 
            var result = this.msecs;
            if(roundDown === true) { 
                result = Math.floor(result);
            }
            return result;
        }
        
        public totalSeconds(roundDown ?){
            var result = this.msecs / this.msecPerSecond;
            if(roundDown === true) { 
                result = Math.floor(result);
            }
            
            return result;
        }
        
        public totalMinutes(roundDown?) { 
            var result = this.msecs / this.msecPerMinute;
            if(roundDown === true) { 
                result = Math.floor(result);
            }
            return result;
        }
        
        public totalHours(roundDown?) { 
            var result = this.msecs / this.msecPerHour;
            if(roundDown === true) { 
                result = Math.floor(result);
            }
            return result;
        }
        
        public totalDays(roundDown?) { 
            var result = this.msecs / this.msecPerDay;
            if(roundDown === true) { 
                result = Math.floor(result);
            }
            return result;
        }
        
        /*
         * Return a Fraction of the TimeSpan
         */ 
        public milliseconds() { 
            return this.msecs % 1000;
        }
        
        public seconds() { 
            return Math.floor(this.msecs / this.msecPerSecond) % 60;
        }
        
        public minutes() { 
            return Math.floor(this.msecs / this.msecPerMinute) % 60;
        }
        
        public hours() { 
            return Math.floor(this.msecs / this.msecPerHour) % 24;
        }
        
        public days() { 
            return Math.floor(this.msecs / this.msecPerDay);
        }
        
        public toString() { 
            var HH = String("0" + this.hours()).slice(-2);
            var mm = String("0" + this.minutes()).slice(-2);
            var ss = String("0" + this.seconds()).slice(-2);
            return String(HH+":"+mm+":"+ss);
        }
        
        /*
         * Misc. Functions
         */ 
        public getVersion() { 
            return this.version;
        }
        
//        console.log("Test: time span to hours " + ("0" + timeSpan.hours().toString()).substring(-2));
//        console.log("Test: time span to minutes " + timeSpan.minutes().toString());
//        console.log("Test: time span to seconds " + ("0" + timeSpan.seconds().toString()).slice(-2));
		
		/*
		 * "Static Constructors"
		 */ 
        public static FromSeconds(seconds) { 
            return new TimeSpan(0,seconds,0,0,0);
        }
        
        public static FromMinutes(minutes) { 
            return new TimeSpan(0,0,minutes,0,0);
        }
        
        public static FromHours(hours) { 
            return new TimeSpan(0,0,0,hours,0);
        }
        
        public static FromDays(days) { 
            return new TimeSpan(0,0,0,0,days);
        }
        
        public static FromDates(firstDate: Date,secondDate: Date,forcePositive:boolean) { 
            var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
            if(forcePositive === true) { 
                differenceMsecs = Math.abs(differenceMsecs);
            }
            return new TimeSpan(differenceMsecs,0,0,0,0);
        }
	}
}
