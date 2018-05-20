+++
title = "Shell Scripts to Manipulate The File Name Extensions"
description = "Basically, renaming!"
slug = "../Shell-Scripts-to-Manipulate-The-File-Name-Extensions"
author = "Lobo"
comments = "true"
date = "2017-10-02 20:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["script", "unix", "backdated post"]
+++

<small>The [latest version](https://github.com/lobopraveen/gists/blob/master/unix/filename_extension_manipulation.md) of this should be available on [GitHub repo](https://github.com/lobopraveen/gists). Please report any issues there.</small>

The following snippets show how to change the file name extensions on multiple files on UNIX machines. Other commands like `rename` and `mmv` might offer alternatives when they are available on the systems. The scripts below use [shell's parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) to operate on multiple files.

- `%` in below scripts match shortest from the end of the string.
- `%%` matches longest from the end
- `#` shortest from the beginning
- `##` longest from the beginning    

`test` command controls if a rename should occur or not.

The following script ensures that all the files that match a specific pattern have ".pgp" extension. This will not touch a matching file which already has ".pgp" extension. Note that if a non ".pgp" extension already exists, it still appends ".pgp".     

```ksh
#!/usr/bin/ksh
for filename in pattern*
do
    test "${filename}" = "${filename%.pgp}" && mv "$filename" "${filename}.pgp"
done
```

This can be easily tweaked to change one extension to another. The below script changes extension to ".gpg" on all ".pgp" files that match a pattern.


```ksh
#!/usr/bin/ksh
for filename in pattern*
do
    test "${filename}" != "${filename%.pgp}" && mv "$filename" "${filename%.pgp}.gpg"
done
```

The above two scripts can be combined when the goal is to change the extension to ".gpg" on all ".pgp" files that match a pattern along with adding ".gpg" extension on extensionless files.

```ksh
#!/usr/bin/ksh
for filename in pattern*
do    
  echo "Changing .pgp extension, if any, to .gpg : ${filename}"

  modifiedfilename="${filename}"  
  test "${filename}" != "${filename%.pgp}" && mv "$filename" "${filename%.pgp}.gpg"  && modifiedfilename="${filename%.pgp}.gpg"

  echo "Append .gpg extension if not present already: ${modifiedfilename}"

  test "${modifiedfilename}" = "${modifiedfilename%.gpg}" && mv "$modifiedfilename" "${modifiedfilename}.gpg" && modifiedfilename="${modifiedfilename}.gpg"

  echo "Final name: ${modifiedfilename}"
done
```


<small>_All posts with [backdated post](/tags/backdated-post) tag are published long after they were written._</small>
