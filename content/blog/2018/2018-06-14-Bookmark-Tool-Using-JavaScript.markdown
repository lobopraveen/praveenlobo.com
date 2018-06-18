+++
title = "Bookmark Tool/Manager Using JavaScript And jQuery Autocomplete"
description = "It is over a decade old!"
slug = "../Bookmark-Tool-Using-JavaScript-And-jQuery-Autocomplete"
author = "Lobo"
comments = "true"
date = "2018-06-14 20:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "HTML", "jQuery", "bookmark"]
+++

> How do you manage your bookmarks?

This is a regular question usually from new team members for the past ten years or so. My answer has been the same, "I use a tool I wrote." followed by, "I will send you a link. You can use it from there or just make a copy of your own."

I remember myself asking that question to others when I first started the job in mid 2000s. Most of my seniors liked to store the links in excel or a word document as we were not allowed to use any browser other than the Internet Explorer (IE) and the bookmarks in IE weren't searchable. No tools were allowed either. This was, and in some cases still is, a common thing at workplaces in enterprises.

After a couple of months of trying different options, I ended up using an HTML page which was another common thing to use. We would set the HTML page as home page and just do Control+F to search for links! Some people used HTML pages with different sections and it got fancier. There were a lot of different ways depending on who you asked.

{{% center %}}
{{< figure src="/media/51-75/54-bookmark-search/bookmark_search.png" link="/media/51-75/54-bookmark-search/bookmark_search.png"  alt="Bookmark Search by Praveen Lobo" caption="Bookmark Search" >}}
{{% /center %}}

If you guessed it, I didn't shy away in creating my own bookmark tool either; however, I'm proud of it and use it even to this day! My version took the HTML page one step further by adding an input box and some JavaScript to search. The initial version was written in vanilla JavaScript and it would fire a search function `onkeyup` which would delete all rows from the table and add new rows that matched the input typed. On escape, it would redirect to the intranet search site with the text entered as search query.

I re-wrote the HTML using jQuery and the autocomplete widget a couple of years after that and added `position` method to center the input box. I used some answers from StackOverflow to implement search on multiple words. After that the only change I did, other than adding the new links, was to update the jQuery version while publishing it now.


#### Chrome's bookmark manager
I use [chrome://bookmarks/](chrome://bookmarks/) for personal use as I have maybe two or so dozens of links only. As you can see in that screenshot above, I really like saving bookmarks without names on the bookmarks bar. Why do I use Chrome's bookmark manager?

1. Adding and removing bookmarks is easy.
1. Search - unlike the tool, Chrome's search looks in the URLs as well. This is not difficult to implement in but I never really felt the need to do it. If you do, submit a [pull request](https://github.com/lobopraveen/gists/tree/master/javascript)!
1. Sync - all my bookmarks are in sync across devices and operating systems.

#### Why use bookmark tool over Chrome's?
 1. Sync - Chrome's sync feature is a plus for personal use and a minus for work. Saving work bookmarks in Chrome would lead to information leak. Also, like many people, I only use one device for work so there is no need for sync.
 1. Cross browser sync and compatibility - a lot of enterprises still have applications that work only on IE! Using static HTML page that works in all browsers basically amounts to syncing between the browsers!
 1. Chrome opens file locations inside browser and IE opens them in Windows Explorer!
 1. Collaboration - all team members can use the same shared HTML page - I use a desktop shortcut to the shared page. A set of small published guidelines will help keep it consistent in terms of keywords.
 1. Usability - keyword highlighting, escape to search, and key-up/key-down to select a link is not available in Chrome's bookmark manager.

This bookmark tool can be implemented on an intranet site or a website easily too. The list of keywords+URL pairs (and even the code itself) can be obtained from the server on `onfocus` event and the list could be customized on the backend based on the user.

This has saved me a lot of hours over the years and hope it helps you save some as well. Comments, suggestions, alternatives are always welcome. Please submit pull requests if you add any useful enhancements.
The latest code can be found on [GitHub](https://github.com/lobopraveen/gists/tree/master/javascript). Here is a [demo](/media/51-75/54-bookmark-search/bookmark_search.html).


```HTML
<!--
 MIT License

 Copyright (c) 2018 Praveen Lobo (praveenlobo.com)

 Part of the code for the autocomplete was taken from stackoverflow.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
-->
<!doctype html>
<html lang="en">
  <head>
    <title>Bookmark Search by Praveen Lobo</title>
    <meta name="description" content="Bookmark Search using jquery.">
    <meta name="keywords" content="bookmark,search">
    <meta name="author" content="Praveen Lobo (lobopraveen@gmail.com) and StackOverflow contributors">
    <meta name="license" content="MIT License">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

<script type="text/javascript">

  $(document).ready(function() {
    // search engine to use on escape key press. input entered will be appended to the URL
    var searchEngineURL = "https://google.com/search?q=";
    
    // Add new keywords and links here. File system and LAN links should escape "\" with an "\"
    var bookmarkList = [
          { value: "LAN Test App1",        url: "\\\\some\\lan\\location"},
          { value: "LAN Stage App1",       url: "\\\\some\\lan\\location"},
          { value: "LAN Prod App1",        url: "\\\\some\\lan\\location"},
          { value: "StackOverflow",        url: "https://stackoverflow.com"},
          { value: "Bing Search",          url: "https://bing.com"},
          { value: "GitHub Lobo",          url: "https://github.com/lobopraveen"},
          { value: "GitHub Repo gists",    url: "https://github.com/lobopraveen/gists"},
          { value: "CI CD Travis",         url: "https://travis-ci.org/"},
          { value: "CI CD Travis Lobo",    url: "https://travis-ci.org/lobopraveen"},
          { value: "CI CD Jenkins",        url: "https://jenkins.io/"},
          { value: "Facebook",             url: "https://facebook.com"},
          { value: "Google News",          url: "https://news.google.com"},
          { value: "Google Search",        url: "https://google.com/"}
    ];

    $("#autocomplete").autocomplete({
        source: function (request, response) {
            var responseArray = [];
            var requestWords = request.term.split(" ");
            // loop through each bookmark in the array
            for (i = 0; i < bookmarkList.length; i++) {
              // loop through each word typed
              for (j = 0; j < requestWords.length; j++) {
                // check the word typed against the bookmark
                regexp = new RegExp(requestWords[j], "ig");
                if (!bookmarkList[i].value.match(regexp)) {
                  // no match
                  break;
                }
              }
              // if the counter matches all words typed, save the bookmark
              if (j == requestWords.length) {
                  responseArray.push({value:bookmarkList[i].value, url:bookmarkList[i].url});
              }
            } // end main for loop
            // send the saved bookmarks as response
            response(responseArray);
        },
        select: function (event, ui) {window.location = ui.item.url;} // go to selected bookmark

    }).data("ui-autocomplete")._renderItem = function (ul, item) {
      // build regex from each word typed
      var searchTerm = $.trim(this.term).split(/\s+/).join("|");
      var newLabel = item.label;
      regexp = new RegExp("(" + searchTerm + ")", "ig");
      // change text style for each matching term by sorrounding matching word/letters with span
      newLabel = newLabel.replace(regexp, "<span style=\"font-weight:bold;color:blue;\">$1</span>");
      // add the newly created label to the autocomplete for rendering
      return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<div>" + newLabel + "</div>")
          .appendTo(ul);
    };

    // center the input box and set cursor
    $("#autocomplete").width(275).position({of: $(window)}).select();
    
    // Let escape key take the entry to the search engine
    $("#autocomplete").keyup(function(e){ 
        if (e.key == "Esc" || e.key == "Escape"){
            window.location = searchEngineURL + $("#autocomplete").val(); 
        }
    });
    
    // putting the signature in place and adding hyperlink
    $("#signature").css({"position":"fixed", "bottom":"10px", "right":"20px", "cursor":"pointer"})
                   .click(function(){ window.location = "https://praveenlobo.com";});

});
</script>

</head>
<body>

  <input type="text" id="autocomplete" value="Enter keywords here...">

  <div id="signature">Bookmark Search by <i>Praveen Lobo</i></div>

</body>
</html>
```
