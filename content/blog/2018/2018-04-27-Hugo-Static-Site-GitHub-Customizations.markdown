+++
title = "Hugo Static Site on GitHub - Customizations"
description = "Because I can!"
slug = "../Hugo-Static-Site-on-GitHub-Customizations"
author = "Lobo"
comments = "true"
date = "2018-04-27 13:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["hugo", "static site"]
toc = true
+++

While working on migrating this site from [WordPress to Hugo](/blog/from-wordpress-to-a-static-site-generator/), I did tweak somethings to make it work for my liking. I usually keep things simple so that future changes are as painless as possible, however, I decided to go ahead with these changes as it improved maintainability and reverting these changes are very straight forward.

### Hugo's default publish directory

Hugo generates the static site content in `public` directory by default. This worked fine for me when I tried hosting this site on GitHub's `master` and `gh-pages` branches. The only _problem_ was that the actual source code and the generated content were in two repositories and that is one more than what I wanted to maintain. Using a `submodule` approach worked fine, but I think it complicates the setup unnecessarily and is easy to mess up.

I wanted to keep it simple and all in one place and that's around the same time GitHub announced [publishing from `docs` folder](https://blog.github.com/2016-08-17-simpler-github-pages-publishing/). Exactly what I wanted and at the right time! Yes, that was 2016 and this post was long overdue!

I have set Hugo to use `docs` as the publish folder and set GitHub Pages to publish the site from `docs` folder on the master branch.

```
publishdir = "docs"
```

### Theme as a regular folder

Instead of setting up the theme using Git's `submodule`, I just keep the theme as a regular folder to avoid using `submodule`. I make sure to watch the theme repo on GitHub so that I get notified about any changes to the theme. I then decide when to get the latest changes.

Another reason for doing this is sometimes I find it easier to edit the theme a little to make it work for me. Editing the source files from another repo is something to avoid as it makes upgrading difficult, but this was an easy way out. Hugo does provide a way to override the theme with `layouts`; however, I haven't really put anytime into making it work that way.

### Content organization

I had about 125 content files directly under `content\blog\` neatly ordered `YYYY-MM-DD` due to filename and it got old really quick. It was annoying when I was trying to look for something or add a new post. I can't imagine maintaining a huge site with a lot of files this way - doable but not my style. I broke down the blog folder into sub-folders based on the year the post was published. The content is now easier to handle.

When the content is moved to different folders, the URLs of the content files change based on where the content file is located. To avoid the URL change, I defined where the content should be shown using the  `slug` variable in the front matter.

After the reorganization, all I had to do was search and replace all occurrences of `slug = "` with `slug = "../`. This worked as I wanted the URL to remain the same as before and wanted to remove the additional `/YYYY/` due to the re-org. This can be achieved using the `url` variable as well.

Note that I had to do this because I don't use the `permalinks` variable in the Hugo config. My content files are named `YYYY-MM-DD-<file/title name>` from WordPress extraction and I already had some posts whose URL didn't match the filename so I was already using slugs to keep URLs clean.

I did break down the `media` folder similar to content files but they are ordered just by numerals. This was a breeze thanks to pattern matching and back-referencing in regex find and replace.

### De-duplicating the media

In my site repo, I had the media in two places. One under `static/media` and the other under the published directory `docs/media`. The total size of media in my case is around 1MB which is just fine but this could be a problem if the size of the media directory is huge.

To de-duplicate the media on the Hugo site repository, I came up with the following strategy.

1. Place the `media` folder in the Hugo recommended `static` directory.
1. Create a `.gitignore` file to ignore `static/media/` folder so that this never gets added to the repo.
1. Build Hugo site. The `media` folder gets copied from `static` folder to the publish directory `docs`

This worked exactly as I planned - two copies of media in local and one in repository. When the repository is pushed to GitHub, it ignored the `static/media/` folder so the repository had exactly one copy of the media. This approach came with caveats - if I was cloning the repository, I would have only one copy in the `docs` folder which meant the `hugo server` command would not render any media. Worse yet, my build step that cleared the publish directory used to remove the only copy of the media. I could fix the build step but the other problem would still remain. To avoid this, I built a clone script that would clone and copy the media folder to static folder right-away.

```bash
$ git clone https://github.com/lobopraveen/praveenlobo.com.git
$ cd praveenlobo.com
$ cp -r docs/media static/media
```

I did take this one step further by creating a symlink instead of copying the media to static directory. This is my preferred approach and it works fine for me as I don't use Microsoft Windows.

1. Place the `media` folder in the Hugo's publish directory `docs`
1. Create a symlink in `static` directory to follow the actual media directory. This is required to make the `hugo server` render media properly when run locally.  
`$ ln -s ../docs/media/ media`
1. Update the clean-up script to retain the `media` in the publish directory  
`$ find docs -mindepth 1 -maxdepth 1 ! -name media -exec rm -rf {} \;`

This approach works well as GitHub supports the symlinks and it works fine with Hugo even though it throws the following error on `hugo server` command as symlinks are not officially supported due to platform dependency.

>ERROR 2018/04/27 17:16:36 Symbolic links for directories not supported, skipping "/home/lobo/blog/praveenlobo.com/static/media"

While running the server, Hugo doesn't actually build the site which means it uses the `static/media` folder and since this is on the local machine, browser's media request follows the symlinks and render the media properly. Hugo ignores/skips the symlinks while building the site which is what I want as the media is already in the publish folder.

All these customizations are visible on the [GitHub repository of this site](https://github.com/lobopraveen/praveenlobo.com).
