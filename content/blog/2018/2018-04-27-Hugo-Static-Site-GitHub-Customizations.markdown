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

I wanted to keep it simple and all in one place and that's around the same time GitHub announced [publishing from `docs` directory](https://blog.github.com/2016-08-17-simpler-github-pages-publishing/). Exactly what I wanted and at the right time! Yes, that was 2016 and this post was long overdue!

I have set Hugo to use `docs` as the publish directory and set GitHub Pages to publish the site from `docs` directory on the master branch.

```
publishdir = "docs"
```

### Theme as a regular directory

Instead of setting up the theme using Git's `submodule`, I just keep the theme as a regular directory to avoid using `submodule`. I make sure to watch the theme repo on GitHub so that I get notified about any changes to the theme. I then decide when to get the latest changes.

Another reason for doing this is sometimes I find it easier to edit the theme a little to make it work for me. Editing the source files from another repo is something to avoid as it makes upgrading difficult, but this was an easy way out. Hugo does provide a way to override the theme with `layouts`; however, I haven't really put anytime into making it work that way.

### Content organization

I had about 125 content files directly under `content\blog\` neatly ordered `YYYY-MM-DD` due to filename and it got old really quick. It was annoying when I was trying to look for something or add a new post. I can't imagine maintaining a huge site with a lot of files this way - doable but not my style. I broke down the blog directory into sub-directories based on the year the post was published. The content is now easier to handle.

When the content is moved to different directories, the URLs of the content files change based on where the content file is located. To avoid the URL change, I defined where the content should be shown using the  `slug` variable in the front matter.

After the reorganization, all I had to do was search and replace all occurrences of `slug = "` with `slug = "../`. This worked as I wanted the URL to remain the same as before and wanted to remove the additional `/YYYY/` due to the re-org. This can be achieved using the `url` variable as well.

Note that I had to do this because I don't use the `permalinks` variable in the Hugo config. My content files are named `YYYY-MM-DD-<file/title name>` from WordPress extraction and I already had some posts whose URL didn't match the filename so I was already using slugs to keep URLs clean.

I did break down the `media` directory similar to content files but they are ordered just by numerals. This was a breeze thanks to pattern matching and back-referencing in regex find and replace.

### De-duplicating the static-content

In my site repo, I had the media (images, video, audio etc.) in two places. One under `static/media` and the other under the published directory `docs/media`. The total size of media in my case is around 1MB which is just fine but this could be a problem if the size of the media directory is huge as the size would be doubled.

To de-duplicate the media on the Hugo site repository, I came up with the following strategy.

1. Place the `media` directory in the Hugo recommended `static` directory.
1. Create a `.gitignore` file to ignore `static/media/` directory so that this never gets added to the repo.
1. Build Hugo site. The `media` directory gets copied from `static` directory to the publish directory `docs`

This approach came with caveats - if I was cloning the repository, I would have only one copy in the `docs` directory which meant the `hugo server` command would not render any media. Worse yet, my build step that cleared the publish directory used to remove the only copy of the media. Even if I fixed the build step and I would have to copy the media directory to the static directory right after a clone. 

I came up with another approach described below and this is my current preferred approach.

1. Place the static contents in the Hugo's publish directory `docs`
1. Use the mounts module to mount the directory. This goes in the config file.
```toml
[module]
  [[module.mounts]]
    source = "docs"
    target = "static"
```
3. Update the clean up step in the build to retain the static content in the publish directory
`$ find docs -mindepth 1 -maxdepth 1 ! \( -name css -o -name js -o -name media -o -name CNAME \) -exec rm -rf {} \;`


Earlier version of this approach used symlinks instead of the mounts module. It worked well even though Hugo threw `Symbolic links for directories not supported` error; Hugo used to ignore/skip the symlinks while building the site which is what I wanted as the media was already in the publish directory. Some Hugo version after 0.62.2 broke the symlink setup with `Error: Error copying static files: symlinks not allowed in this filesystem` error. See [issue #74](https://github.com/lobopraveen/praveenlobo.com/issues/74)

All these customizations are visible on the [GitHub repository of this site](https://github.com/lobopraveen/praveenlobo.com).
