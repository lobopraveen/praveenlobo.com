+++
title = "Multisite WordPress Installation On Sibling Directories Of An Existing Single Installation"
description = ""
slug = "../multisite-wordpress-installation-on-sibling-directories-of-an-existing-single-installation"
author = "Lobo"
comments = "true"
date = "2011-05-05 05:33:39"
timezone = "CDT"
categories = ["1"]
tags = ["wordpress", "blog", "multisite", "workaround"]
+++

#### Is it possible to create a blog in a sibling directory of an already installed WordPress directory? If yes, how to? If not, can it be done on a fresh installation?

##### 1. Existing Installation:

Assume that the domain is praveenlobo.com and there is an existing WordPress installation in /blog directory (so, praveenlobo.com/blog is a WordPress blog and the root directory at praveenlobo.com is free). Now, is it possible to create a networked site or blog at praveenlobo.com/anotherblog by setting up the network and allowing multisite?

When the existing installation is turned to multisites, the new blogs automatically get the address as praveenlobo.com/blog/anotherblog. Is it possible to override this to change the address to praveenlobo.com/anotherblog?

##### 2.  Fresh Installation:

This can be achieved by installing the WordPress at the root praveenlobo.com, setting up a network, and creating two blogs under praveenlobo.com/blog and praveenlobo.com/anotherblog. This will probably have a total of three blogs - one in the root and two in the sub-directories.

Is it possible to get rid of the WordPress blog at the root praveenlobo.com and just have the other two in the sub-directories? ~~Replacing the index.php at the root by a custom welcome file is one option, but that is just a work-around and the root directory will still be cluttered with a number of WordPress files.~~

Any ideas/suggestions/pointers are really appreciated.

*Edit:* Looks like this isn't possible. Even overriding the home directory with a custom welcome file doesn't work. I tried a lot of things around this issue and nothing seems to work!
