+++
title = "Why I choose to go against using WordPress Multisite?"
description = ""
slug = "../why-i-choose-to-go-against-using-wordpress-multisite"
author = "Lobo"
comments = "true"
date = "2011-07-09 07:58:39"
timezone = "CDT"
categories = ["1"]
tags = ["wordpress", "multisite", "blog"]
+++

When you start out with the WordPress, it's common to assume that each blog needs a separate WordPress installation. But there's a simpler way. WordPress Multisite installation. This lets one have different blogs with just one installation of WordPress. But, why did I choose not to use it?

### Advantges and Disadvantages of WordPress Multisite

#### Advantages:

1. The multisite blogs have all features of a regular blog with just one installation i.e only one database and one set of code-base. Easy to back-up all blogs.

1. Easy on maintainability - Since it uses only one database and one set of code-base, it's easy to upgrade and apply patches. There is no need to update blogs individually.


#### Disadvantages:

1. You break one thing/blog and entire network of blogs will come down.

1. Not all plugins support multisite installation.(most of the high rated plugins do)

1. If you ever need to move one blog out to separate domain, it's a pain in the neck process.

1. With WordPress multisite it is not possible install a blog in a directory and have another networked blog in a [sibling directory](/blog/multisite-wordpress-installation-on-sibling-directories-of-an-existing-single-installation/). If you don't want to install WordPress in the root directory, it is not possible to have domain/blog and domain/anotherblog kind of setup.


The last point was the nail in the coffin of WordPress multisite for me.    
