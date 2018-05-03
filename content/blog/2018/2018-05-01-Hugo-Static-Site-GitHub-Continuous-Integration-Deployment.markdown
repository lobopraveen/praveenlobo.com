+++
title = "Hugo Static Site on GitHub - Continuous Integration/Deployment"
description = "Using Travis-CI"
slug = "../Hugo-Static-Site-GitHub-Continuous-Integration-Deployment"
author = "Lobo"
comments = "true"
date = "2018-05-01 23:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["hugo", "static site", "travis", "ci cd", "automation"]
toc = true
+++

After [migrating](/blog/from-wordpress-to-a-static-site-generator/) the blog to Hugo and making some [custom changes](/blog/hugo-static-site-on-github-customizations/), it was time to develop the CI-CD pipeline. The key objectives for my CI-CD pipeline were

1. to be able to build the site locally and
1. to be able to build the site remotely on the integration server

### Build Locally

More often than not, I use my computer to post stuff on this site. As I already have the site repo and Hugo on my machine, I run the `hugo server --buildDrafts` while editing the repo with a browser window open on my secondary monitor to monitor the edits. This is the simplest no nonsense editor setup I use.

I wanted to be able to build the whole site locally when I have everything I need already. It didn't make much sense to push the changes to GitHub and have Travis-CI handle the build and publish part. I don't have any tests and sanity checks built on the CI server anyway.

I built the following script to automate the build and deployment activities.

```bash
code here
```

Notice the pull at the very beginning. It is added so that the local code is updated with any changes or updates made from other workspaces or remote builds.

The `[skip ci]` text in the Git commit message notifies Travis to ignore the check-in.


### Build Remotely

For the times when I don't have access to my computer but still wanted to update the site, I setup the CI-CD pipeline. This allows me to post from virtually anywhere, any device as long as I can connect and commit to GitHub repo. GitHub's markdown preview acts as a basic WYSIWYG editor except that it doesn't understand Hugo's shortcodes which honestly is not a big inconvenience.

Setting this up at a high level was as easy as -

1. [Creating deploy keys](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) for the repo so that Travis can deploy the built site. The public key goes in GitHub and the private key goes to Travis.
1. [Encrypting the private key](https://docs.travis-ci.com/user/encrypting-files/) so it remains secret and only Travis can decrypt it. This needs travis gems installed and of course, Ruby as well.
1. Building the steps that Travis will take whenever it finds a commit to the repo.

Here is the travis.yml I use.

```yml
language: go

install:
# "Step 1 - instaling hugo"
- go get github.com/gohugoio/hugo

before_script:
# "Step 2 - cleaning website publish folder 'docs'. Keeping media intact.
- find docs -mindepth 1 -maxdepth 1 ! -name media -exec rm -rf {} \;
# "Step 3 - building the hugo site"
- hugo version
- hugo
# "Step 4 - decrypting the deploy key"
- openssl aes-256-cbc -K $encrypted_a781b6369385_key -iv $encrypted_a781b6369385_iv -in travis_blog_deploy.enc -out travis_blog_deploy -d
- chmod 600 travis_blog_deploy
# "Step 5 - adding the deploy key to the keyring"
- eval `ssh-agent -s`
- ssh-add travis_blog_deploy
- rm -f travis_blog_deploy
# "Step 6 - setting up git parameters"
- git config --global user.email "lobopraveen@gmail.com"
- git config --global user.name "travis"
# "Step 7 - commit the changes to the branch - $TRAVIS_BRANCH"
- git status
- git stash
- git checkout $TRAVIS_BRANCH
- git stash pop
- git add -A
- git commit -m "Travis deploy for $TRAVIS_COMMIT. [skip ci]"
# "Step 8 - push the changes to github"
- git remote set-url origin git@github.com:lobopraveen/praveenlobo.com.git
- git push origin
# "Successfully built and deployed the site!"

notifications:
  email:
    on_success: change
    on_failure: always

```

Notice how I have `before_script` phase doing all the work? It is because Travis build doesn't fail immediately on error in certain phases. See more details [here](https://github.com/travis-ci/travis-ci/issues/1066).

Hugo publish directory cleanup retains media folder due to the [ Hugo media de-duplicate strategy](/blog/hugo-static-site-on-github-customizations/#de-duplicating-the-media) I employ.

The `[skip ci]` text in the Git commit message notifies Travis to ignore the check-in so that it doesn't go into an infinite loop.

---
The repo this site is based on is on GitHub - https://github.com/lobopraveen/praveenlobo.com  

The Travis-CI page for this site is here - https://travis-ci.org/lobopraveen/praveenlobo.com
