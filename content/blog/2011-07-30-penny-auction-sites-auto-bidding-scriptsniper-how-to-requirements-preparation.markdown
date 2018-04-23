+++
title = "Penny Auction Sites Auto Bidding Script (Sniper)"
description = "How To - Requirements & Preparation"
slug = "penny-auction-sites-auto-bidding-script-sniper-how-to-requirements-preparation"
author = "Lobo"
comments = "true"
date = "2011-07-30 18:26:40"
timezone = "CST"
categories = ["1"]
tags = ["scam", "bots", "auction", "bidding", "penny", "JavaScript", "html", "automate"]
+++

Part I of this post series can be found [here](/blog/penny-auction-sites-auto-bidding-script-bid-sniper-how-to-introduction/).

---

#### 3. Requirements for the script:

1. The script shall have a lower limit to start bidding i.e. the script should not start bidding if the actual price in the bid hasn't crossed a set limit.

1. The script shall have an upper limit to bidding i.e. it shall stop bidding if the bid price crosses certain limit.

1. The script shall bid a fixed number of times i.e. the script shall stop bidding if the total number bids placed by it exceeds a preset number even if the upper limit has not been reached.

1. The script shall place a bid only if the time to bid is less than a predetermined number of seconds.

1. The script shall not place a bid if the last bidder is self.

1. The script shall stop bidding if there is a winner.


---

#### 4. Preparation for the script:

This is a bit tricky because there is no one-script-works-on-all-auction-site solution. There would be one if only all penny auction sites are built by the same team and used same code. So, this is where the basic of HTML will come into play. Look up the code using inspect element and find out the following.

1. Item identifier - there might not be a separate identifier for this. Some sites use a number for this and just append it to all other identifiers mentioned below.

1. Price  identifier.

1. Timer identifier.

1. Current winning bidder identifier.

1. Identifier or class used to denote the winner when the bid ends. This can be found when the bidding ends. Usually there will be a style (class) applied to the timer or winner DIV element. Just keep the Inspect Element window open and notice the change at the end of the bid.

1. Last but not least, find out how a bid is placed. This could be a bit tricky. Once you are logged in, inspect the bid button and find out how the bid is being placed. All sites use AJAX call so it must be through a JavaScript method call.


The following is a bare-bone structure. The actual site's code might have a lot more style/class and other elements in between.

{{< highlight HTML >}}
<div id="MainBiddingDIV">
    <div id="Price_XXXX">$0.01</div>
    <div id="Timer_XXXX">00:00:22</div>

    <div id="CurrentWinningBidDIV">
        <img src="user_image.png" id="UserImage">
        <div id="Winning_XXXX">WinningBidderName</div>
    </div>

    <div>
        <input type="button">Place A Bid</a>
        OR [ <a href="">Place a bid</a> ]
    </div>
</div>

{{< / highlight >}}

The above code doesn't have styles assigned whereas the penny auction sites will definitely have classes assigned. The bidding button can be any element, just inspect element and find out what it is and what it does, which method it calls etc.


Building the script and using it in the [next post](/blog/penny-auction-sites-auto-bidding-script-sniper-how-to-building-and-using-the-script/).
