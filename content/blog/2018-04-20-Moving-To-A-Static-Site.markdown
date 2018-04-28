+++
title = "From WordPress to A Static Site Generator"
description = "Hugo and GitHub Pages"
slug = "From-WordPress-to-A-Static-Site-Generator"
author = "Lobo"
comments = "true"
date = "2018-04-20 00:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["blog", "wordpress", "hugo", "static site"]
+++

I have been telling myself that I will get back into blogging [again](/blog/holy-crap-missing-in-action) and [again](/blog/what-have-i-been-up-to-this-summer) in vain. I have a bunch of drafts that I have not posted; I keep thinking about posting them and posting my views about [current affairs](/tags/current-affairs) and daily life. For some reason I just can't commit to it. I feel like I have hit this big writer's block and I somehow don't want to get out if it. I have been very happy with my personal as well as work life and have been spending time learning and doing things that are fulfilling. I do have a few regrets and one them is not blogging; I wish I had written more that when I looked back I could see how I have evolved over time. Anyway, I getting slightly off-topic.

I have had this website on a paid shared server for a number of years. Although I never faced any issue with the hosting provider, I did realize I was wasting money on them when I could just use a static site and use one of the many free hosting services. After a little research I settle on [Hugo](https://gohugo.io/) as the static site generator and [GitHub Pages](https://pages.github.com/) as the host. GitHub made sense for this site as the traffic volume is low to non-existent lately and it allows to host the site directly from the repository. I'm not going to outline the process step by step here. There are numerous tutorials available already.

This whole process at a high level -

1. install Hugo
2. pick a Hugo theme - they come with an example sites
3. setup up the folder structure and move all migrated markdowns to contents folder
4. run hugo and copy the contents from `publishdir` to GitHub
5. update repository settings so that GitHub publishes the site


I did try out a few different ways of publishing a site using GitHub Pages. They have good [documentation](https://help.github.com/categories/github-pages-basics/) which was a big help. I finally picked the Project Pages sites as it fit my needs better.

Converting the WordPress site to static site and making it run smoothly was really a pain. I followed the recommended tools for [migration](https://gohugo.io/tools/migrations/) and made a list of [issues/enhancements](https://github.com/lobopraveen/praveenlobo.com/issues?q=) that I noticed. I think the major issues I faced moving from WordPress to Hugo are -  

1. Comments - Static sites don't have built in commenting system. I ended up migrating the comments to disqus but the site was not showing comments on many posts as the WordPress to markdown conversion had altered some URLs which disqus uses as key. I have since fixed the URLs; however, I'm still not very comfortable with using a third party commenting system.

1. Media links - I had used WordPress short codes for images and the converter didn't understand the WordPress shortcodes and broke almost all media links. I fixed this and I also rearranged the media folder.

1. Code snippets were broken - I ended up moving the code snippets AS-IS to GitHub. I provided a link to GitHub as well as used Hugo's `highlight` short-code on this site.

1. Search option - I had Google Custom Search on this blog before but to keep things simple, I'm settling with [a direct Google search link](https://www.google.com/search?q=site:praveenlobo.com)

1. Missing Google AdSense - this is not a Hugo problem. Themes should support this. My current theme doesn't support Adsense by default; however, it does allow custom JS files. I included the Adsense code in the custom JS. I used to make just enough money from this site to pay for the webhost but that ad money has long gone! I did add a [review page](/reviews-and-referral-links) with Amazon referral links - check it out.

I'm working on some more customizations. Hope to write some more on it soon.
