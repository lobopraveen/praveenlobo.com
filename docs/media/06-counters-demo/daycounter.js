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
