+++
title = "How To Remove The /blog/ slug From The Permalinks(URL) Without A Plugin"
description = "In WordPress Multisite Installation"
slug = "../how-to-remove-the-blog-slug-from-the-permalinksurl-in-wordpress-multisite-installation-without-a-plugin"
author = "Lobo"
comments = "true"
date = "2011-05-24 06:58:10"
timezone = "CDT"
categories = ["1"]
tags = ["wordpress", "blog", "multisite", "permalink", "slug"]
+++

What is a blog slug? If you have no clue, this post isn't for you and if you want to know what it is, it is an ugly looking additional "/blog/" in the permalinks (URLs) in your website that comes free with the multisite feature in WordPress. Why ugly? Because it comes uninvited, it's there and most probably you don't want it.

How do you remove the additional "blog" in the URL of your posts? Simple, install some plugin which does it for you? That is what I thought; however, before doing so, I just took a careful look at the `wp_options` table. BAM! There it was. After spending about 30 minutes with settings and checking the data in this table, I have figured out a way to solve the blog slug problem without the need for a plugin. No need to change a bit of code. You don't even need to execute any queries. The query and the table values are shown below just to indicate what your action does to the database values. It's a simple process; only step 2 and 3 need your action, you can skip the rest!

Just read on and try it out on your blog. I have also added the explanation (a little that I know). Beware, I haven't read more than 10 lines of PHP code, so I don't know what happens in the code but I'm 100% sure on what the end result will be.

*Edit:* Mladen put all whys and hows to rest in a comment below. Three cheers to the awesome commenter!

#### Steps to remove blog slug from post links:

* Here, I'm assuming that you have your permalinks as `/%postname%/` Go to your blog and click on any post. You will notice the blog slug. This is because of the following to two records in `wp_options` table.  
{{< highlight sql >}}
SELECT *
FROM  'wp_options'
WHERE 'option_name' = 'permalink_structure' OR
      'option_name' = 'rewrite_rules'
{{< / highlight >}}  

|option_id|blog_id|option_name|option_value|autoload|
|:---:|:---:|:---:|:---:|:---:|
|1234|0|permalink_structure|/blog/%postname%/|yes|
|5678|0|rewrite_rules|:77:{s:52:"blog/category/(.+?)/feed/(feed\|rdf\|rss...|yes|


*  Now, update the Permalink Structure.  
Go to Network Admin » Sites  » Move cursor over the main site name(/) » Edit » Settings » Scroll down to Permalink Structure and update it to `/%postname%/` and click on Save at the bottom of the page.  
Go to your blog and click on any post, you will notice a 404 - page not found error. This is because the above step only updates permalinks(`wp_options.permalink_structure`) and the records look like this:

|option_id|blog_id|option_name|option_value|autoload|
|:---:|:---:|:---:|:---:|:---:|
|1234|0|permalink_structure|%postname%/|yes|
|5678|0|rewrite_rules|:77:{s:52:"blog/category/(.+?)/feed/(feed\|rdf\|rss...|yes|


* Update rewrite rules.  
Go to Site » move cursor on main site name(/) » Dashboard » Settings » Permalink. Notice Custom Structure. You will see that blog/ is outside the textbox and `%postname%/` appears in the textbox. Do **not** edit or save anything on this page. Now, the data in the table looks like:


|option_id|blog_id|option_name|option_value|autoload|
|:---:|:---:|:---:|:---:|:---:|
|1234|0|permalink_structure|%postname%/|yes|
|5678|0|rewrite_rules|:77:{s:47:"category/(.+?)/feed/(feed\|rdf\|rss...|yes|

What happens is that when you visit this page, `rewrite_rules` gets changed automatically. May be it has something to do with autoload column, I don't know!

---

A few things I noticed:

* The value updated in step 2, goes to database as is and just to `permalink_structure` record.
* Any value updated in step 3, updates both rows mentioned above.
* WordPress takes the value in the database, removes the "/blog/" substring from it and shows the remaining in the textbox in step 3. The "blog/" shown outside the textbox is kinda fooling you.
* Wordpress adds "/blog/" to any value in the textbox updated from step 3 and updates both records in the database.
* That is the reason, you **shouldn't** update the permalinks from the page in step 3; it will automatically get "/blog/" added to the front of it and we will be back to square one.

---

Once done, visit the blog and click on any post. You should see the post and the permalink (URL) shouldn't have the "blog slug". If you still see it or if you are getting 404 error, you have screwed up something. Antonio left a tip on how to solve the 404s in his comment below. Take a look if need be.

Leave a comment on this blog saying how useful it was or how stupid I really am. If I take a look at the code someday, I will be sure to let you know how exactly it works. If you do know already, please leave a comment.


Oh, I also noticed that WordPress auto corrects the permalinks (URLs) even if you enter it wrong. For e.g. if your blog post is "example.com/somepost", WordPress will take you to the right page even if you enter "example.com/YouCantSeeMe/somepost"! It could be that, WordPress uses RegEx or some matching algorithm that compares from right to left and if it finds a match, it will take you to the page even if there are "/.\*/" left on the left. Just a guess!  Any idea?  

Check this for more info -  [How does WordPress handle permalinks?](https://wordpress.stackexchange.com/questions/19470/how-does-wordpress-handle-permalinks)
