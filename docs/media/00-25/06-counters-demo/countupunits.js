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

function CountUpUnits(initDate, id){
  this.counterDate = new Date(initDate);
  this.secDiff = 0, this.seconds = 0, this.minutes = 0, this.hours = 0;
  this.days = 0, this.weeks = 0, this.months = 0, this.years = 0;
  this.countainer = document.getElementById(id);
  this.countainer.title = initDate;
  this.updateCounter();
}

CountUpUnits.prototype.calculateUnits=function(valuePerUnit){
  var tmp = this.secDiff/valuePerUnit;
  tmp = Math.abs(tmp) < 1? 0 : tmp;
  return (tmp < 0 ? Math.ceil(tmp) : Math.floor(tmp));
}

CountUpUnits.prototype.calculate=function(){
  this.secDiff = Math.round(((new Date()) - this.counterDate)/1000);
  this.seconds = Math.round(this.secDiff);
  this.minutes = this.calculateUnits(60);
  this.hours = this.calculateUnits(3600);
  this.days = this.calculateUnits(86400);
  this.weeks = this.calculateUnits(604800);
  this.months = this.calculateUnits(2629744);
  this.years = this.calculateUnits(31556928);
}

CountUpUnits.prototype.updateCounter=function(){
  this.calculate();
  this.countainer.innerHTML ="<strong>" + this.years + "</strong> <small>" + (this.years == 1? "year" : "years") + "</small><br/>" +
    "<strong>" + this.months + "</strong> <small>" + (this.months == 1? "month" : "months") + "</small><br/>" +
    "<strong>" + this.days + "</strong> <small>" + (this.days == 1? "day" : "days") + "</small><br/>" +
    "<strong>" + this.hours + "</strong> <small>" + (this.hours == 1? "hour" : "hours") + "</small><br/>" +
    "<strong>" + this.minutes + "</strong> <small>" + (this.minutes == 1? "minute" : "minutes") + "</small><br/>" +
    "<strong>" + this.seconds + "</strong> <small>" + (this.seconds == 1? "second" : "seconds") + "</small><br/>";
  var self = this;
  setTimeout(function(){self.updateCounter();}, 1000);
}
