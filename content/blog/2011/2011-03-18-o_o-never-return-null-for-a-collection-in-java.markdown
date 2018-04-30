+++
title = "O_ops: Never Return null For A Collection in Java"
description = ""
slug = "../oops-never-return-null-for-a-collection-in-java"
author = "Lobo"
comments = "true"
date = "2011-03-18 06:50:13"
timezone = "CDT"
categories = ["1"]
tags = ["oops", "java", "null"]
+++

I was enjoying a small break between the meetings when my a co-worker asked me to help her out with some Java error in the code she was working on. She was giving me walk-through of the code and I small piece of code caught my attention. Apparently, the coder knew not to return null when returning a collection.

{{< highlight java >}}

/* Check if the list is null \*/
if(matchingCountryList != null) {
	return matchingCountryList;
} else {
	return null;
}

{{< / highlight >}}

Of course, it was not her code. :wink:
