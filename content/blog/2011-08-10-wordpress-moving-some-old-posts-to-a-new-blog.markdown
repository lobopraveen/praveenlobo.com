+++
title = "WordPress: Moving Some Old Posts To A New Blog"
description = "A checklist."
slug = "wordpress-moving-some-old-posts-to-a-new-blog"
author = "Lobo"
comments = "true"
date = "2011-08-10 05:16:33"
timezone = "CDT"
categories = ["1"]
tags = ["wordpress", "blog", "checklist"]
+++

I recently moved a bunch of blog posts to a new blog installation. This wasn't necessary but just an exercise to learn what it takes to move the posts. It was easy after a lot of reading. Here is a checklist I prepared. Hope it helps someone looking for similar stuff. Comments and suggestions are welcome. Use it at your own risk!


---
1. **WordPress:** Install WordPress.

1. **Plugins:** Install necessary plugins. Enable all of them and set them up. Some plugins do provide an option to import/export settings. Export settings from old blog to a file and replace all occurrences of old blog URL to new blog if needed.

1. **Export Database:** Using MyPHP Admin from CPanel export the all tables from old WordPress database except `wp_options`. (I'm not sure about other tables but this one gave me some problems when I imported). Also export the entire database for the new blog before next step so that you can clean it up by importing the new database SQL in case anything goes wrong.

1. **Import database:** Replace all occurrences of old blog URL in the backup file and import the tables (basically run the SQL file). If you see anything amiss, try exporting and importing the tables excluded in previous step!

1. **Permanent Redirect:** Once the old blog is gone, all links on the web pointing to the old blog posts will throw 404 error and will affect the site rankings. To avoid the side effect and to keep all traffic to the new blog, redirect the old URLs to new ones. This can be done via plugins. However, I noticed that the plugin needed me to keep the posts on old blog as well for it to work which I didn't like. There were also other problems. So, I ended up adding 301 (permanent) redirects in the .htaccess file.

1. **Check redirect:** test a couple of old blog post links and see if 301 redirect works correct.

1. **Test new blog:** go to new blog and just click on links and mess around a bit to make sure nothing is broken esp. the tags, categories, and other meta stuff.

1. **Delete old blog post:** Delete (move to trash) the old blog posts on the old blog. Don't remove them completely yet; you can keep that task when you are sure everything is setup correctly.

1. **Update Tags and Categories:** Go to the old blog and delete all tags and categories that were unique to the moved posts. Easiest way is to check if they have any posts associated with them. If there are none, just get rid of them. The new blog will have tags and categories from old blog due to import. Delete orphan tags and categories from new blog as well.

1. **Update other settings:** if you are using custom search engines, AdSense, Analytics etc, make sure you update the settings on the new blog.

1. **Media:** Move the media (such as images, videos, documents etc) to new blog. Since we did a replace all on the SQL file, the image URLs will be pointing to the new blog.

1. **RSS:** The most important task. Provide correct RSS. If you do not want your old blog RSS subscribers to get new blog RSS, you don't need to do anything. If you want to provide old as well as new posts to the subscribers, you need some more settings. This is where services like FeedBurner are valuable. If you are using FeedBurner and want the original RSS to include both old and new blog posts, create a combined RSS feed using Yahoo Pipes. You can update the FeedBurner settings to include the Yahoo piped RSS so that RSS readers will continue to get all posts.
Don't fret if you are not using FeedBurner. You can create one now and redirect your old RSS link to FeedBurner's link using htaccess. Once that is done, just use pipes as described above.  The Subscribe All option I provide uses Yahoo Pipes.


---


Comments and suggestions are welcome.
