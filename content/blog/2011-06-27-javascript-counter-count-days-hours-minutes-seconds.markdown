+++
title = "JavaScript Counter"
description = "Count Days Hours Minutes Seconds"
slug = "javascript-counter-count-days-hours-minutes-seconds"
author = "Lobo"
comments = "true"
date = "2011-06-27 05:44:31"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "Count Down", "Count Up", "timer", "Counter"]
+++

I keep getting requests and I can't help but post another JavaScript related counter! As always, in case of any issues/doubts/suggestions, feel free to leave a comment.


### JavaScript Counter to Count Days Hours Minutes Seconds -

This script is very simple; it takes a date to count the time from/to, an ID to put the timer in. To be very precise, this counter shows the total number of 24 hours intervals between the date-time given and current date-time. It is also possible to have more than one timer on a page. [Demo page](/media/06-counters-demo/daysHMScounter-demo.html).

**JavaScript Day, Hours, Minutes, Seconds Counter**  
This works with past as well as future days. If a future date is used, it acts as a countdown timer and when the date is reached it just rolls over and acts as a countup timer.


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

function DaysHMSCounter(initDate, id){
    this.counterDate = new Date(initDate);
    this.container = document.getElementById(id);
    this.update();

}

DaysHMSCounter.prototype.calculateUnit=function(secDiff, unitSeconds){
    var tmp = Math.abs((tmp = secDiff/unitSeconds)) < 1? 0 : tmp;
    return Math.abs(tmp < 0 ? Math.ceil(tmp) : Math.floor(tmp));
}

DaysHMSCounter.prototype.calculate=function(){
    var secDiff = Math.abs(Math.round(((new Date()) - this.counterDate)/1000));
    this.days = this.calculateUnit(secDiff,86400);
    this.hours = this.calculateUnit((secDiff-(this.days*86400)),3600);
    this.mins = this.calculateUnit((secDiff-(this.days*86400)-(this.hours*3600)),60);
    this.secs = this.calculateUnit((secDiff-(this.days*86400)-(this.hours*3600)-(this.mins*60)),1);
}

DaysHMSCounter.prototype.update=function(){
    this.calculate();
    this.container.innerHTML =
        " <strong>" + this.days + "</strong> " + (this.days == 1? "day" : "days") +
        " <strong>" + this.hours + "</strong> " + (this.hours == 1? "hour" : "hours") +
        " <strong>" + this.mins + "</strong> " + (this.mins == 1? "min" : "mins") +
        " <strong>" + this.secs + "</strong> " + (this.secs == 1? "sec" : "secs");
    var self = this;
    setTimeout(function(){self.update();}, (1000));
}

{{< / highlight >}}
