#!/bin/bash
#
# MIT License
#
# Copyright (c) 2018 Praveen Lobo (praveenlobo.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

# Function to git add all commit push (gaacp). Up to two parameters are accepted for commit message
gaacp() {
  echo "Updating local repo with latest files..."
  git add -A
  git commit -m "$1. $2"

  if [[ $? -ne 0 ]]; then
    echo "ERROR: Local repo commit failed."
    exit 1
  fi

  echo "Pushing the updated repo to GitHub..."
  git push origin master

  if [[ $? -ne 0 ]]; then
    echo "ERROR: git push failed."
    exit 1
  fi
}
# End Function

if [ $# -ne 1 ]; then
  echo -e "ERROR: Missing parameter. \nUsage: $0 \"commit message\""
  exit 1
fi

echo "Pulling latest repo from GitHub..."
git pull origin master

if [[ $? -ne 0 ]]; then
  echo "ERROR: Repo pull failed."
  exit 1
fi

read -p "Do you want to build the site locally? y/n: " localbuild

if [[ $localbuild = "y" || $localbuild = "Y" ]]; then
  echo "Local build selected."
  echo "Present working directory: " `pwd`

  echo "Cleaning up publish directory..."
  find docs -mindepth 1 -maxdepth 1 ! -name media -exec rm -rf {} \;

  echo "Hugo version: " `hugo version`
  echo "Building Hugo site locally..."
  hugo

  if [[ $? -ne 0 ]]; then
    echo "ERROR: Site build failed."
    exit 1
  fi

  gaacp "$1" "[skip ci]"

elif [[ $localbuild = "n" || $localbuild = "N" ]]; then
  echo "Remote build selected."
  gaacp "$1"
  echo "Please remember to pull the latest from the remote repo once the remote build deploys the site."

else
  echo "ERROR: Incorrect input supplied."
  exit 1
fi
