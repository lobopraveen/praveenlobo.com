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
