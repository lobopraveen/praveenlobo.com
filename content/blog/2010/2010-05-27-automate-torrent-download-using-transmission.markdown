+++
title = "Automate Torrent Download Using Transmission"
description = "Overcoming the problem with the swget."
slug = "../automate-torrent-download-using-transmission"
author = "Lobo"
comments = "true"
date = "2010-05-27 00:00:00"
timezone = "IST"
categories = ["1"]
tags = ["Unix", "cron", "torrent", "wget", "script", "transmission"]
+++


A while ago I wrote about [swget - A Simple wget Wrapper](/blog/swget-a-simple-wget-wrapper) The methods described don't work for torrents. Today I had to download a video which was not available through direct download, but I found a few torrents for the same. After fiddling around with the scheduler available in Transmission I found it to be absolutely useless; it doesn't work!

After a little search on the net, I found a workaround for this too!


1. install transmission-cli -  
`$sudo apt-get install transmission-cli`

1. add a cron job to start downloading all torrents and set it to start at 2:05AM  
`5 2 * * * transmission-remote --torrent all --start`

1. add another cron job to stop all downloads at 7:55AM  
`55 7 * * * transmission-remote --torrent all --stop`

1. put the torrents for download, pause all of them, and go to sleep!

Last step is very important as `transmission-remote` command works only if the Transmission is already up and running.

That's all for now. Comments/suggestions are welcome.
