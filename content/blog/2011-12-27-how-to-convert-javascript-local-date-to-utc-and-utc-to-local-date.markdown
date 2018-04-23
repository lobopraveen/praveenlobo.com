+++
title = "How To Convert JavaScript Local Date to UTC And UTC To Local Date"
description = ""
slug = "how-to-convert-javascript-local-date-to-utc-and-utc-to-local-date"
author = "Lobo"
comments = "true"
date = "2011-12-27 07:04:40"
timezone = "CST"
categories = ["1"]
tags = ["JavaScript", "UTC", "epoch", "locale", "Timezone"]
+++


DST is such a pain when it comes to programming. I wish they just get rid of it. It’d be helpful; however, the programmers will still have to deal with the timezones. I was answering questions related to the [timers](/tags/timer/) on this website and I keep getting a lot of questions on DST and the timezones. Even though it seems easy, this topic is very confusing. There are lot many sources on the Internet and reading them confuses the hell out of me.

To avoid conflicts when dealing with the transactions from many different timezones, it is essential to normalize the dates and by normalizing I mean converting it to UTC. Let me take an example in JavaScript.

Let the date in question be in Indian Standard Time (IST) `January 02, 2012 22:00:00 GMT+0530`


#### How to convert the date into a local time(CST)?

{{< highlight JavaScript >}}
var now = new Date("January 02, 2012 22:00:00 GMT+0530");
/* now = Mon Jan 02 2012 10:30:00 GMT-0600 (CST) */

{{< / highlight >}}


#### How to convert a date to UTC?
This is where many of the online sources go wrong. The simple answer is to convert the date into milliseconds since Epoch and add the timezone offset and convert it back to a date object. Simple? No, this is partially correct. When the calculated milliseconds are converted back to a date, you get a local date.

{{< highlight JavaScript >}}
var nowUtc = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
/* nowUtc = Mon Jan 02 2012 16:30:00 GMT-0600 (CST) */
{{< / highlight >}}


Notice the GMT-0600 (CST) part at the end. That means the resulting date is not GMT, it is CST. If you convert this date to GMT it will read - `Mon Jan 02 2012 22:30:00 GMT` but we want it to be `Mon Jan 02 2012 16:30:00 GMT`

There is also another incorrect way mentioned all over the Internet -

{{< highlight JavaScript >}}
var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
{{< / highlight >}}


The result will be no different than the one that you see above.

#### How to convert the local date to UTC date?

{{< highlight JavaScript >}}
now.toUTCString()
/* now = Mon, 02 Jan 2012 16:30:00 GMT */
{{< / highlight >}}


#### How to get the local date from the UTC date?

{{< highlight JavaScript >}}
now = new Date(now.toUTCString());
/* now = Mon Jan 02 2012 10:30:00 GMT-0600 (CST) */
{{< / highlight >}}


#### That is a long string to store, is there any alternative to store the UTC time?
Just store the number of milliseconds since Epoch converted to UTC by adding the timezone offset.

{{< highlight JavaScript >}}
var millis = now.getTime() + (now.getTimezoneOffset() * 60000)
/* millis = 1325543400000 */
{{< / highlight >}}


#### How to convert the milliseconds in UTC to local date?
Subtract the timezone offset.

{{< highlight JavaScript >}}
now.setTime(millis - (now.getTimezoneOffset() * 60000))
/* now = Mon Jan 02 2012 10:30:00 GMT-0600 (CST) */
{{< / highlight >}}


The code from above is used in this [demo page](/media/52-javascript-utc/javascript-utc-demo.html). Let me know if you have any questions or comments.

<small>Update: moved the code to [github](https://github.com/lobopraveen/JavaScript-UTCDate)</small>
