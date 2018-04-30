+++
title = "swget - A Simple wget Wrapper"
description = "Making nightly downloads easy."
slug = "../swget-a-simple-wget-wrapper"
author = "Lobo"
comments = "true"
date = "2010-03-17 19:24:15"
timezone = "IST"
categories = ["1"]
tags = ["Unix", "BSNL", "cron", "torrent", "wget", "script"]
+++


### THE PROBLEM


I have BSNL 500C+ broadband connection which gives me 2.5GB of data transfer per month. This limit is sufficient only for usual surfing. 500C+ plan also gives me night unlimited option i.e. the data transferred between 2AM to 8AM is not counted towards the 2.5GB quota per month. I can download around 4GB in this time frame. I use this time to download contents, but the real problem is starting the download at 2AM.

There are a lot of discussions out there which suggests that the modem should be rebooted at 2AM to avoid the data transferred after 2AM getting billed. You will also get a lot of scripts and tools do this for you. Combining this with scheduling capabilities of download managers and torrents should solve the issue. I haven't tried any of this though. Once I started the download and turned off the modem immediately; I got up at 2AM to turn on the modem! This was really a pain. I never downloaded anything after that.

Recently, I realised that rebooting the modem is not required at all; however, the download should be started after 2AM. I could simply try torrent client to do that but the restriction of using torrent clients is that one cannot download content directly from website(right?); it is P2P.


### A SOLUTION


To overcome this, I created a small utility script called swget- a simple wget wrapper to download contents from multiple URLs esp. for BSNL night unlimited users. This is also available on https://github.com/lobopraveen/swget

{{< highlight bash >}}
#!/bin/bash
#
# swget - A simple wget downloader
#
# Copyright (C) 2010  Praveen Lobo (praveenlobo.com)
#
# Permission to use, copy, modify, and/or distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
# ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
# ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTUOUS ACTION, ARISING OUT OF
# OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

LOG=`pwd`"/$0.log"

echo "Simple wget downloader by Praveen Lobo(Lobo@PraveenLobo.com)" | tee $LOG
echo "More information at https://praveenlobo.com/blog/swget-a-simple-wget-wrapper/ " | tee -a $LOG
echo "Log - $LOG"

if [ $# -ne 1 ]; then
 echo "Usage: $0 [FILENAME]"
 exit 101
fi

filename=$1

if [ ! -e $1 -o ! -s $1 ]; then
 echo "File:$1 does not exist or is 0-byte file!"
 exit 101
fi

# Get current hour, minute and milliseconds since epoch
hhmmS=`date "+%H:%M:%s"`
hh=`echo $hhmmS | cut -d":" -f1`
mm=`echo $hhmmS | cut -d":" -f2`
secondsNow=`echo $hhmmS | cut -d":" -f3`

# Get milliseconds since epoch at 2:05AM 'today'
dt="`date +%m/%d/%Y` 02:05 AM"
secondsAtTwo5=`date --date "$dt" +%s`

if [ $hh -gt 6 ]; then
 # It's already past 6:59AM; Get milliseconds since epoch at next 2:05AM
 secondsAtTwo5=`expr $secondsAtTwo5 + 86400`
fi

# Get difference between now and next 2:05AM
gap=`expr $secondsAtTwo5 - $secondsNow`

if [ $gap -gt 0 ]; then
 # Sleep until next 2:05AM
 echo "`date "+%m/%d/%Y %H:%M:%S"` Sleeping for $gap seconds..." | tee -a $LOG
 sleep $gap
fi

echo "`date "+%m/%d/%Y %H:%M:%S"` Starting download..." | tee -a $LOG

# Start dowloading the contents mentioned in the file; Give 10 seconds gap between each download
# Remove -nv option to get a detailed log
wget -nc -nv --progress=bar:force -w 10  -i $1 -a $LOG

echo "`date "+%m/%d/%Y %H:%M:%S"` Download complete..." | tee -a $LOG

# Running this script as root will shutdown the system;
halt

{{< / highlight >}}


## Specifications:
**Input**: A file which contains the URLs of contents to be downloaded. One URL per line.

**Syntax**:
`sh swget.sh URLFile` - this will not shutdown system after the download is complete.
`sudo sh swget.sh URLFile` - this will shutdown the system once the download is complete.

**Output**: Downloads the contents to the present working directory; it also creates a log file.

**Limitation**:
Once started, the download continues until it is complete. It doesn't stop downloads at 8AM. If you have a large file you'd have to take care of stopping the download at 8AM.
Also, I'm not sure if the incomplete downloads are resumed. By default wget command resumes incomplete downloads but I have not tested it.


## ALTERNATIVES


Though the aforementioned solution works, there is a much simpler way of doing the same using [cron](http://en.wikipedia.org/wiki/Cron). Just register the below command, using crontab -e command, in your cron.


{{< highlight bash >}}
5 2 * * * wget -nc -nv -w 10  -i URLFile -a LogFile -P DownloadFolder
{{< / highlight >}}


If the system is on, the wget command runs at 2:05AM every day and downloads the content from URLs mentioned in the URLFile to DownloadFolder. There is no need to delete this from cron once the download is complete; however, the URLFile needs to be cleaned up so that when the job runs again at next 2:05AM, it doesn't download anything.

The beauty of this approach is that I can just put the URLs in URLFile as and when I get them and leave the system turned on at the end of the day to get the contents downloaded. However, I see a problem with this approach - if I decide to download something after 2:05AM, I would have run the wget command explicitly since the cron job runs exactly once at 2:05AM everyday. It goes without saying that even this approach doesn't take care of 8:00AM deadline. I can either stop the download manually or add another job to shutdown the system at 8:00AM!

Thanks for reading it till the end! If you have any questions or suggestions other than shifting to a unlimited plan, please feel free to leave a comment. BSNL 500C+ is best for me! ;o)

<small>
_Update (2010-05-27):_ The above methods don't work for torrents, here is a [solution](/blog/automate-torrent-download-using-transmission).
</small>
