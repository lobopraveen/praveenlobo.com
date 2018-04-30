+++
title = "A couple of ways to tokenize a delimited String in Java"
description = ""
slug = "../a-couple-of-ways-to-tokenize-a-delimited-string-in-java"
author = "Lobo"
comments = "true"
date = "2011-08-12 03:54:41"
timezone = "CDT"
categories = ["1"]
tags = ["Java", "String", "Tokenizer"]
+++


#### StringTokenizer:

It is a legacy class and its use is discouraged in new code. I don't like to use this class even if it weren't a legacy class because it ignores blank tokens. Below code will not output the blank("") between _A_ and _In_ and the last blank token after _Me_.

{{< highlight Java >}}
StringTokenizer st = new StringTokenizer("I,Have,A,,In,Me,", ",");
while (st.hasMoreTokens()) {
	System.out.println(st.nextToken());
}
{{< / highlight >}}


#### split method:

Javadoc suggests `split` method of `String` or the `java.util.regex` package as alternatives. The split method returns the blank tokens in-between two tokens; however, the last blank token(after _Me_) will still be missing. We need some extra code to get the last token.

_**Update:**_ I completely missed the overloaded split method - `string.split(DELIMITER,-1)` will work just fine. I'm keeping the rest of the post below as is.

{{< highlight Java >}}
final String DELIMITER = ",";
String string = "I,Have,A,,In,Me,";
for (String value : string.split(DELIMITER)) {
	System.out.println(value);
}

// Check for last token
int lastIndex = string.lastIndexOf(DELIMITER);
if (lastIndex == string.length()-1) {
	System.out.println(string.substring(lastIndex + 1));
}
{{< / highlight >}}




#### Write your own tokenizer code:


{{< highlight Java >}}
String string = "I,Have,A,,In,Me,";
final String DELIMITER = ",";

int i = 0,  j = string.indexOf(DELIMITER);

// while there are tokens
while (j != -1) {
	System.out.println(string.substring(i, j));
	i = j + 1;
	j = string.indexOf(DELIMITER, i);
}

// extract the last token
if (i 			System.out.println(string.substring(i));
}
{{< / highlight >}}

I got a little crazy and changed the above code.

{{< highlight Java >}}
String string = "I,Have,A,,In,Me,";
final String DELIMITER = ",";

int i = 0, j = -1;

// while there are tokens
while ((j = string.indexOf(DELIMITER, (i = ++j))) != -1) {
	System.out.println(string.substring(i, j));
}

// extract the last token
System.out.println(string.substring(i));
}
{{< / highlight >}}

Same thing using for.

{{< highlight Java >}}
String string = "I,Have,A,,In,Me,";
final String DELIMITER = ",";

int i = 0;

// for each token in the string
for (int j = -1; (j = string.indexOf(DELIMITER, (i = ++j))) != -1;) {
	System.out.println(string.substring(i, j));
}

// extract the last token
System.out.println(string.substring(i));
}
{{< / highlight >}}

The most basic benchmarking - using `System.nanoTime()` in while loop with 1,000,000 iterations. The average of 5 such runs are below.

|Method|average runtime|
|---|---|
|Tokenizer|2.569156437 (quicker but doesn't give the desired output.)|
|String.split()|4.567683168 (remember the last token?)|
|While|2.690626660|
|2nd While|2.765533696|
|For|2.717799994|
