+++
title = "Get Last Friday Of The Month In Java"
description = "Get Any Last Day actually!"
slug = "../Get-Last-Friday-Of-The-Month-In-Java"
author = "Lobo"
comments = "true"
date = "2018-08-05 20:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["Java", "GitLab", "CI CD", "gradle", "junit"]
+++

Old wine in new bottle. That is what this post is except that in this case you are better off looking for new wine instead. The new bottle here being gradle, junit, GitLab-CI etc.

If you didn't get the point, please use `java.time` or `joda-time` in that order before using mine. Apparently, even `calendar` has a [slick](https://stackoverflow.com/a/2545695/319542) way of doing this! Although the algorithm I outline works, the implementation suffers from the same limitations as the original `java.util.date or calendar` implementation.

---

I came across a [post](https://stackoverflow.com/questions/76223/get-last-friday-of-month-in-java) asking the last Friday question a long time ago and found the [answer](https://stackoverflow.com/a/77077/319542) (also shown below) quiet interesting.

```java
public Date getLastFriday( int month, int year ) {
   Calendar cal = Calendar.getInstance();
   cal.set( year, month + 1, 1 );
   cal.add( Calendar.DAY_OF_MONTH, -( cal.get( Calendar.DAY_OF_WEEK ) % 7 + 1 ) );
   return cal.getTime();
}
```
I wanted to see if this can be generalized to work for any day like last Sunday or last Wednesday etc.  

The main part of the logic is in calculating the number of days to subtract:
```java
( cal.get( Calendar.DAY_OF_WEEK ) % 7 + 1 ); //for Friday
```   
This was missing a critical piece if this had to be flexible to accept any day of the week. After working out a number of examples, I derived the inconspicuously named magic number which turns out to be zero for Friday!

```java
// Calendar.FRIDAY is 6
int lobosMagicNumber = (13 - Calendar.FRIDAY) % 7;  // equals 0
```

Here is a the worksheet:  
(read: when the first day of the NEXT month is Sunday, we need to subtract 7 to get the last Sunday of the month. 6 to get the last Monday and so on.)

{{% center %}}
{{< figure src="/media/51-75/55-java-lastdayutil/LastDay.png" link="/media/51-75/55-java-lastdayutil/LastDay.png"  alt="Get Last Any Day Of The Month" caption="Get Last Any Day of The Month" >}}
{{% /center %}}

Here is the implementation:

```java
/**
 * Returns the date of the last specified <code>day</code> of the month.
 *
 * @param date
 *            a date for which the last specified <code>day</code> of the
 *            month has to be determined
 * @param day
 *            any day of the week
 *
 *            <p>
 *            Example: lastDayOfMonth(date, Calendar.SUNDAY) returns last
 *            Sunday of <code>date</code>
 *
 * @return the date of the last specified <code>day</code> of the month.
 *  
 */
public final static Date lastDayOfMonth(Date date, int day) {
	Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	// set calendar to the first day of the next month
	cal.set(Calendar.DAY_OF_MONTH, 1);
	cal.add(Calendar.MONTH, 1);

	// calculate the number of days to subtract to get the last desired day of the month
	int lobosMagicNumber = (13 - day) % 7;
	cal.add(Calendar.DAY_OF_MONTH, -(((lobosMagicNumber + cal.get(Calendar.DAY_OF_WEEK)) % 7) + 1));

	return cal.getTime();
}
```

I have published the code on [GitHub](https://github.com/lobopraveen/Java-LastDayUtil) which is mirrored on [GitLab](https://gitlab.com/lobopraveen/Java-LastDayUtil) to use [GitLab-CI](https://gitlab.com/lobopraveen/Java-LastDayUtil/pipelines). Just for giggles, I also setup a [project page](https://lobopraveen.gitlab.io/Java-LastDayUtil/) to provide the Javadoc and JUnit artifacts from the latest build on the master branch.
