+++
title = "Penny Auction Sites Auto Bidding Script (Sniper)"
description = "How To - Building and Using The Script"
slug = "penny-auction-sites-auto-bidding-script-sniper-how-to-building-and-using-the-script"
author = "Lobo"
comments = "true"
date = "2011-07-30 23:24:11"
timezone = "CST"
categories = ["1"]
tags = ["scam", "bots", "auction", "bidding", "penny", "JavaScript", "html", "automate", "bookmarklet"]
+++

Part I and II of this post series can be found [here](/blog/penny-auction-sites-auto-bidding-script-bid-sniper-how-to-introduction/) and [here](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-requirements-preparation/) respectively.

---

#### 5. Build the script:

Assume that the HTML skeleton given in [previous post](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-requirements-preparation/) is indeed the code and when the bid ends the timer gets a class called `BIDEND`. Finally, say the code used by the site to place a bid is `PennyAuction.placeBid(itemCode);`. With this information build a script.

{{< highlight JavaScript >}}

// Get the codes from the user
// Note : If it's integer then parseInt method can be used around the prompt.
var itemCode = prompt("Please enter the item code:");
var lowPrice = parseInt(prompt("Please enter the price at which you want to start bidding:"), 10);
var highPrice = parseInt(prompt("Please enter the price at which you want to stop bidding:"), 10);
var maxBids = parseInt(prompt("Please enter the maximum number of bids you want to place:"), 10);
var secondsToPlaceBid = parseInt(prompt("Please enter the remaining time below which a bid should be placed:"), 10);

// Build the identifiers
var who = "Winning_" + itemCode;
var priceID = "Price_" + itemCode;
var timerID = "Timer_" + itemCode;

/*
 * This method places a bid if the item is in the price range if the timer goes below
 * "secondsToPlaceBid" and if the maximum number of bids has not been reached.
 *
 * Note that the "BIDEND" and the "USERNAME" needs to be updated for the site in question.
 *
 */
function placeBid() {
    if (document.getElementsByClassName("BIDEND").length == 1) {
        // The bid ended; stop bidding.
        return;
    }

    // Get the price; strip $ sign
    var currPrice = parseInt((document.getElementById(priceID).innerHTML.substring(1)),10);

    if (currPrice <= lowPrice) {
        // Price limit not reached; wake up just in time for next bid
        setTimeout("placeBid()", 8000);
    }

    if (document.getElementById(who).innerHTML != "USERNAME") {
        // You are not the current bidder

        if (maxBids == 0) {
            alert("All of the allocated bids have been placed!");
            return;
        }

        if (currPrice > highPrice) {
            alert("Price of the item has exceeded the high price set!");
            return;
        }

        secondsRemaining = parseInt(document.getElementById(timerID).innerHTML.split(":")[2], 10);

        if (secondsRemaining < secondsToPlaceBid) {
            // Time to place a bid; update counter & wake up just in time for next bid
            PennyAuction.placeBid(itemCode);
            maxBids = (maxBids - 1);
            setTimeout("placeBid()", 8000);

        } else {
            // Enough time left; wake up later to try
            setTimeout("placeBid()", 500);
        }

    } else {
        // You are the current bidder; wake up just in time for next bid(if exists)
        setTimeout("placeBid()", 8000);
    }
}

// Call the method defined above to take care of the dirty business
placeBid();

{{< / highlight >}}

This is it. This code should do the trick; Note that  `BIDEND`, `USERNAME` and `PennyAuction.placeBid(itemCode);` needs to be updated with respect to the auction site in question.


---

#### 6. Using the script:

_Update: Executing code from address bar as described below has been blocked in newer browsers. Please read one of the comments below for more info._

Now that you have all the weapons, you should know how to use them. The above script can be saved as a bookmarklet and can be invoked on the auction site's bidding page. Or you can simply copy paste the updated script in the address bar of the browser. Of course, you should update the above mentioned values before you do that.

To run the script from the address bar -

1. Remove all comments. The lines starting with `//`

1. Remove all new line characters - the script should be in a single line. Some text editors allow Replacing newline character. Just perform a `Replace All` to replace `/n` with nothing.

1. Append `javascript:` in front of the script

1. Copy and paste the script line in the address bar and hit enter.


If you want to see how it works, just copy and paste the below line in the address bar of the browser and hit enter:  
`javascript:var response = prompt('How is your day today?');alert('and you typed - ' + response);`


---


That's all. I hope it was helpful and you know how to build and use a sniper bot yourself now. I did try this on one of the famous bidding sites and it placed bids as it was designed to. However, I didn't win because I had very less bids to place and exhausted all of it. Let me reiterate, this script or anything for that matter won't guarantee winning. It all depends on the auction sites. They control the bidding with bots on the server side which keeps bidding until there is no one else to place a bid thus keeping the item as well as the price for bidding. However, they do frequently give some items away to make it look legitimate and fool people into participating. I'm not guessing this; I'm convinced that this is what they do. Their business model doesn't make sense otherwise!

Edit: Don't believe me? Take a look at what Joshua Stein found - [link](https://jcs.org/notaweblog/2009/03/06/trying_to_game_swoopo_com/).

**Use the information found here at your own risk. I shall not be held liable for any losses or damages – monetary or otherwise.**
