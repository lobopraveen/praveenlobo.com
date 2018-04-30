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
