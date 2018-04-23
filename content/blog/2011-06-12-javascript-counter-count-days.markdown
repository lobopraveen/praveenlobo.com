+++
title = "Javascript Counter"
description = "Count Days."
slug = "javascript-counter-count-days"
author = "Lobo"
comments = "true"
date = "2011-06-12 00:52:10"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "count up", "count down", "counter", "timer"]
+++

John Watt sent me a request asking if I could help with changing the [JavaScript CountUp Timer](/blog/javascript-countup-timer/) to show only the number of days in a counter. He also wanted to display the days in 3 digits.

I did reply with changes but it had a defect due to a last minute change! So, I wrote a clean script which is the reason for this post. One main improvement here is, the script doesn't update every second. Updating the day counter every second is not needed since the number of days doesn't change every second. The below script updates the counter only when the day count mentioned in the counter has to change.

As always, in case of any issues/doubts/suggestions or you just want to appreciate, feel free to leave a comment.

_Update:_ I have moved the code to [GitHub - JavaScript Counters](https://github.com/lobopraveen/JavaScript-Counters).


#### Javascript Counter to Count just the days -

This script is very simple; it takes a date to count the time from or to, an ID to put the timer in. To be very precise, this counter shows the total number of 24 hours intervals between the date-time given and current date-time. It is also possible to have more than one timer on a page. [Day Counter Demo page](/media/06-counters-demo/daycounter-demo.html).

**JavaScript Day Counter - works with past as well as future days.**

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

function DayCounter(initDate, id){
    this.counterDate = new Date(initDate);
    this.container = document.getElementById(id);
    this.calculate();
}

DayCounter.prototype.calculate=function(){
    var secDiff = Math.round(((new Date()) - this.counterDate)/1000);
    var nextUpdate = (nextUpdate = (secDiff % 86400)) < 0? (nextUpdate*-1) : (86400-nextUpdate);
    var tmp = Math.abs((tmp = secDiff/86400)) < 1? 0 : tmp;
    var days = (tmp < 0 ? Math.ceil(tmp) : Math.floor(tmp));
    this.container.innerHTML =
        "<strong>" + days + "</strong> " + (Math.abs(days) == 1? "day" : "days");
    var self = this;
    setTimeout(function(){self.calculate();}, (++nextUpdate*1000));
}

{{< / highlight >}}


**JavaScript Day Counter - The below code is optimized for past dates.**  
It will work with future dates too; however, the days will show "000 day" until the (future date + 1) unlike the other script (which shows days left until future days and then just rolls over to show the counter). Also, the counter gets updated randomly which, I think, shouldn't be a problem.

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

function DayCounter(initDate, id){
    this.beginDate = new Date(initDate);
    this.container = document.getElementById(id);
    this.calculate();
}

DayCounter.prototype.calculate=function(){
    var secDiff = Math.round(((new Date()) - this.beginDate)/1000);
    var nextUpdate = 86400 - (secDiff % 86400);
    var tmp = (tmp = secDiff/86400) < 1? 0 : Math.floor(tmp);
    var days = (tmp < 10 ? ("00" + tmp) : tmp < 100 ? ("0" + tmp) : tmp);
    this.container.innerHTML =
        "<strong>" + days + "</strong> " + (days == 1? "day" : "days");
    var self = this;
    setTimeout(function(){self.calculate();}, (++nextUpdate*1000));
}


{{< / highlight >}}


**JavaScript Day Counter Fraction.**  
This counter will count the fraction part too. This updates every 1/100th of a day i.e. every 0.01 day.


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

function DayCounterFraction(initDate, id){
    this.counterDate = new Date(initDate);
    this.container = document.getElementById(id);
    this.calculate();
}

DayCounterFraction.prototype.calculate=function(){
    var secDiff = ((new Date()) - this.counterDate)/1000;
    var days = (secDiff/86400).toFixed(2)
    this.container.innerHTML =
        " <strong>" + days + "</strong> " + (Math.abs(days) == 1? "day" : "days");
    var self = this;
    var nextUpdate = (nextUpdate = (secDiff % 864).toFixed(0)) < 0? (nextUpdate*-1) : (864-nextUpdate);
    setTimeout(function(){self.calculate();}, (++nextUpdate*1000));
}

{{< / highlight >}}


**Note**: [Day Counter Fraction Demo page](/media/06-counters-demo/daycounterfraction-demo.html).


To make Minute Counter or Hour Counter change 86400 to 60 or 3600 respectively. This is just the number of seconds in a minute/hour/day.
