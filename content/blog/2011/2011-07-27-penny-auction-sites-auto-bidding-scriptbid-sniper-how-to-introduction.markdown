+++
title = "Penny Auction Sites Auto Bidding Script (Bid Sniper)"
description = "How To - Introduction"
slug = "../penny-auction-sites-auto-bidding-script-bid-sniper-how-to-introduction"
author = "Lobo"
comments = "true"
date = "2011-07-27 04:11:36"
timezone = "CST"
categories = ["1"]
tags = ["scam", "bots", "auction", "bidding", "penny", "JavaScript", "html", "automation", "tutorial"]
+++

I wrote a prologue to penny auction sites [beginning of this year](/blog/penny-auction-sites/), but never posted the bot script I promised I would! I didn't because I didn't want others to lose money, but shouldn't one use his own judgment before using any advice found on the Internet? Before anything else I would like to warn you - use the information found here at your own risk. I shall not be held liable for any damage - monetary or otherwise. Also, this will not guarantee winning; the auction sites are built smart enough to cheat most users and pick winners rarely and randomly!

I will explain the idea for automatically bidding on most penny auction sites on behalf of the user. I will also give an example script for a virtual auction site. At the end of this post series, one should be able to build a script on their own. I hope.  


---
1. Basics of HTML
1. How to dissect a web page
1. Requirements for the script
1. Preparation for the script
1. Build the script
1. Using the script


_Update_ - [ [Part II](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-requirements-preparation/) ] & [ [Part III](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-building-and-using-the-script/) ]

---

#### 1. Basics of HTML

HTML basics are necessary to make this idea work. Google may be a good start. I will, however, explain the least basic thing needed.

HTML is a markup language used to build the websites. Each page on the website is made up of a number of different elements such as dropdowns, input text boxes, radio buttons, checkboxes, paragraphs of text etc. Each of these elements will be represented by a element tag in HTML. Dropdowns are `<SELECT>`; paragraphs are `<p>`; a group of elements in a container - called div - are `<DIV>`.

Each and every element in the mark up language can be given an identifier. This identifier can be used to fetch the element and it's children using JavaScript.
For e.g. a button is `<input type="button" id="btnID">` abd it can be identified using `document.getElementById("btnID")` in JavaScript or simply `$("#btnID")` in jQuery.

Similarly, there are methods and properties around these elements that can be used to read, write, and manipulate the elements. For e.g. the following code will click the button using the script - `document.getElementById("btnID").click()` or `$("#btnID").click()`

Then, there are styles. Styles are used to decorate the elements on a web page. A text in big red font is a style; a underlined text is also through a style. These styles are usually placed in .css files, also called as style-sheets.

{{< highlight JavaScript >}}
//a line in style sheet
.styleName {font-size:100px;}

// An element in web page
<DIV id="divID" class="styleName">
    This is 100px text!
</DIV>

// accessing it using JavaScript
document.getElementById("divID")
//OR
document.getElementsByClassName("styleName")
//OR
$("#divID")
//OR
$(".styleName")

{{< / highlight >}}

These basics should help one in extracting the fields that show the bid timer, last bidder, item code, last bid amount elements, and their identifiers.


#### 2. How to dissect a web page

Once the basics of HTML are familiar, one need to know how to dissect the web pages at a very high level. This is needed so that one can get the elements, identifiers of the bidding site, and build a bot to bid without any manual intervention. There are many ways of looking at the internals of the web pages.

Most basic will be to right click on the page and view page source and searching for the element using the text. This, however, is not the best that is available. FireBug can be used on the FireFox browser to get to the internals. Similarly, on Chromium browser, any element can be directly reached by right-clicking on the element and selecting Inspect Element. I'd suggest using Chromium browser because of its simplicity in this matter. Go right ahead and _Inspect Element_ for the bid timer. See how the timer keeps changing in the source as well. Give particular emphasis on the element tags, the identifiers, and the styles (class).


[more to follow...](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-requirements-preparation/)
