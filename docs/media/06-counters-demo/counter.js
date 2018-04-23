/**********************************************************************************************
# MIT License
#
# Copyright (c) 2018 Praveen Lobo (praveenlobo.com)
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

function Counter(initDate, id){
    this.counterDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}

Counter.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}

Counter.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

Counter.prototype.calculate=function(){
    var futureDate = this.counterDate > new Date()? this.counterDate : new Date();
    var pastDate = this.counterDate == futureDate? new Date() : this.counterDate;
    this.seconds = this.datePartDiff(pastDate.getSeconds(), futureDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(pastDate.getMinutes(), futureDate.getMinutes(), 60);
    this.hours = this.datePartDiff(pastDate.getHours(), futureDate.getHours(), 24);
    this.days = this.datePartDiff(pastDate.getDate(), futureDate.getDate(), this.numOfDays[futureDate.getMonth()]);
    this.months = this.datePartDiff(pastDate.getMonth(), futureDate.getMonth(), 12);
    this.years = this.datePartDiff(pastDate.getFullYear(), futureDate.getFullYear(), 0);
}

Counter.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}

Counter.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}

Counter.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML ="<strong>" + this.years + "</strong> " + (this.years == 1? "year" : "years") +
        " <strong>" + this.months + "</strong> " + (this.months == 1? "month" : "months") +
        " <strong>" + this.days + "</strong> " + (this.days == 1? "day" : "days") +
        " <strong>" + this.hours + "</strong> " + (this.hours == 1? "hour" : "hours") +
        " <strong>" + this.minutes + "</strong> " + (this.minutes == 1? "minute" : "minutes") +
        " <strong>" + this.seconds + "</strong> " + (this.seconds == 1? "second" : "seconds");
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}
