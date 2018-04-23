+++
title = "JavaScript CountDown Timer"
description = ""
slug = "javascript-countdown-timer"
author = "Lobo"
comments = "true"
date = "2011-06-27 06:44:13"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "Count Down", "timer", "Counter"]
+++

This counter takes a date to count the time to, an ID to put the timer in. It is possible to have more than one timer on a page. [Demo page](/media/06-counters-demo/countdown-demo.html).

As soon as the count down goes to 0 i.e. the future date is hit, the counter stops at 0 years 0 months 0 days 00 hours 00 minutes 00 seconds.

Please do leave me a comment. Thanks!

{{< highlight JavaScript >}}

/**********************************************************************************************
# MIT License
#
# Copyright (c) 2011 Praveen Lobo (praveenlobo.com)
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

function CountDown(initDate, id){
    this.endDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}

CountDown.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}

CountDown.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

CountDown.prototype.calculate=function(){
    var futureDate = this.endDate;
    var currDate = new Date();
    this.seconds = this.datePartDiff(currDate.getSeconds(), futureDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(currDate.getMinutes(), futureDate.getMinutes(), 60);
    this.hours = this.datePartDiff(currDate.getHours(), futureDate.getHours(), 24);
    this.days = this.datePartDiff(currDate.getDate(), futureDate.getDate(), this.numOfDays[futureDate.getMonth()]);
    this.months = this.datePartDiff(currDate.getMonth(), futureDate.getMonth(), 12);
    this.years = this.datePartDiff(currDate.getFullYear(), futureDate.getFullYear(),0);
}

CountDown.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}

CountDown.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}

CountDown.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML ="<strong>" + this.years + "</strong> <small>" + (this.years == 1? "year" : "years") + "</small>" +
       " <strong>" + this.months + "</strong> <small>" + (this.months == 1? "month" : "months") + "</small>" +
       " <strong>" + this.days + "</strong> <small>" + (this.days == 1? "day" : "days") + "</small>" +
       " <strong>" + this.hours + "</strong> <small>" + (this.hours == 1? "hour" : "hours") + "</small>" +
       " <strong>" + this.minutes + "</strong> <small>" + (this.minutes == 1? "minute" : "minutes") + "</small>" +
       " <strong>" + this.seconds + "</strong> <small>" + (this.seconds == 1? "second" : "seconds") + "</small>";
    if ( this.endDate > (new Date()) ) {
        var self = this;
        setTimeout(function(){self.updateCounter();}, 1000);
    }
}

{{< / highlight >}}
