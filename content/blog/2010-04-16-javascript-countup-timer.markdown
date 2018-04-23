+++
title = "JavaScript CountUp Timer"
description = "I will build one myself."
slug = "javascript-countup-timer"
author = "Lobo"
comments = "true"
date = "2010-04-16 13:30:03"
timezone = "IST"
categories = ["1"]
tags = ["JavaScript", "count up", "counter", "timer"]
+++

<small>
_Update (2018):_ I have moved the code to [GitHub - JavaScript Counters](https://github.com/lobopraveen/JavaScript-Counters) AS IS.
</small>


I was in need of timer to mark [an important decision](/blog/quit-smoking/); I did what most of us would do - search on the internet. I found quite a few of them, but I didn't like any of them. Some of them were unnecessarily complicated; a couple of others weren't easily understandable; most of them were using approximation (esp. for months and years).

My requirement was that the timer should be simple and which counts time exactly the same way we humans do. So I decided to write one myself. Before going into the details, I wanted it for [my homepage](/).

### JavaScript CountUp Timer

This script is very simple; it takes a date to count the time from, an ID to put the timer. It is also possible to have more than one timer on a page - check the demo link given at the end of this post.

**JavaScript CountUp Timer v2.0**

{{< highlight JavaScript >}}
/**********************************************************************************************
# MIT License
#
# Copyright (c) 2010 Praveen Lobo (praveenlobo.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
**********************************************************************************************/

function CountUp(initDate, id){
    this.beginDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}

CountUp.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}

CountUp.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

CountUp.prototype.calculate=function(){
    var currDate = new Date();
    var prevDate = this.beginDate;
    this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
    this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
    this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()]);
    this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
    this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
}

CountUp.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}

CountUp.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}

CountUp.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML ="<strong>" + this.years + "</strong> <small>" + (this.years == 1? "year" : "years") + "</small>" +
        " <strong>" + this.months + "</strong> <small>" + (this.months == 1? "month" : "months") + "</small>" +
        " <strong>" + this.days + "</strong> <small>" + (this.days == 1? "day" : "days") + "</small>" +
        " <strong>" + this.hours + "</strong> <small>" + (this.hours == 1? "hour" : "hours") + "</small>" +
        " <strong>" + this.minutes + "</strong> <small>" + (this.minutes == 1? "minute" : "minutes") + "</small>" +
        " <strong>" + this.seconds + "</strong> <small>" + (this.seconds == 1? "second" : "seconds") + "</small>";
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}

{{< / highlight >}}

If you noticed the version, it is v2.0! Initially I had slightly different idea to update the counter every second. Though it seemed to work fine, I could think of a case where it would break. `numOfDays[]` is set initially when the timer starts. If the browser is kept open for a long time (really long time!), `numOfDays[1]` could become invalid. This could have been fixed easily in v1.0 itself, but I rewrote it to make it even simpler.


I have created a page to demonstrate the timer - [demo](/media/06-counters-demo/countup-demo.html)

I also built a count up timer that uses **approximation** to calculate units. In this counter each unit is independent of the other. Please see [countupunits.js](/media/06-counters-demo/countupunits.js) and [countupunits-demo.html](/media/06-counters-demo/countupunits-demo.html)


In case of any issues/doubts/suggestions or you just want to appreciate :o), feel free to leave a comment.


**JavaScript CountUp Timer v1.0**

{{< highlight JavaScript >}}
/**********************************************************************************************
# MIT License
#
# Copyright (c) 2010 Praveen Lobo (praveenlobo.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
**********************************************************************************************/

function CountUp(initDate,id){
	this.beginDate = new Date(initDate);
	this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	var currYear = (new Date()).getFullYear();
	if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
		this.numOfDays[1] = 29;
	}
	this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
	this.hours = 0, this.minutes = 0, this.seconds = 0;
	this.calculate();
	this.update(id);
}

CountUp.prototype.datePartDiff=function(then, now, MAX){
	var temp = this.borrowed;
	this.borrowed = 0;
	var diff = now - then - temp;
	if ( diff > -1 ) return diff;
	this.borrowed = 1;
	return (MAX + diff);
}

CountUp.prototype.formatTime=function(){
	this.seconds = this.addLeadingZero(this.seconds);
	this.minutes = this.addLeadingZero(this.minutes);
	this.hours = this.addLeadingZero(this.hours);
}

CountUp.prototype.addLeadingZero=function(value){
	return (value + "").length < 2 ? ("0" + value) : value;
}

CountUp.prototype.calculate=function(){
	var currDate = new Date();
	var prevDate = this.beginDate;
	this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
	this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
	this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
	this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()-1]);
	this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
	this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
}

CountUp.prototype.update=function(id){
	if ( ++this.seconds == 60 ) {
		this.seconds = 0;
		if ( ++this.minutes == 60 ) {
			this.minutes = 0;
			if ( ++this.hours == 24 ) {
				this.hours = 0;
				if ( ++this.days == this.numOfDays[(new Date()).getMonth()-1]){
					this.days = 0;
					if ( ++this.months == 12 ) {
						this.months = 0;
						this.years++;
					}
				}
			}
		}
	}
	this.formatTime();
	var countainer = document.getElementById(id);
	countainer.innerHTML ="<strong>" + this.years + "</strong> <small>years</small> <strong>" +
		this.months + "</strong> <small>months</small><strong> " + this.days +
		"</strong> <small>days</small> <strong>" + this.hours + "</strong> <small>hours</small> <strong>" +
		this.minutes + "</strong> <small>minutes</small> <strong>" + this.seconds +
		"</strong> <small>seconds</small>.";
	var self=this;
	setTimeout(function(){self.update(id);}, 1000);
}

{{< / highlight >}}
