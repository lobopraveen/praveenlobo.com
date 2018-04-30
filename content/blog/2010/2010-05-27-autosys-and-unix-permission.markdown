+++
title = "Autosys and Unix Permission"
description = "How does this work?"
slug = "../autosys-and-unix-permission"
author = "Lobo"
comments = "true"
date = "2010-05-27 17:57:27"
timezone = "IST"
lastmod = "2010-11-04"
lastmodtimezone = "CDT"
categories = ["1"]
tags = ["Autosys", "Unix", "script"]
+++

Say Autosys job called `jobName` executes with `xyz` id. The profile used is `profile`; owner of profile is `abc` and neither group nor others have execute permission on this profile. `jobName` executes `jobScript` which is owned by `xyz`(both `jobName` and `jobScript` are owned by `xyz`). `abc` and `xyz` are two users. There is a group `abc` as well.

{{< highlight bash >}}
$id abc
uid=1234(abc) gid=10(abc)
$id xyz
uid=1234(xyz) gid=10(users)
$ll profile
-r-xr+++-- 1 abc abc 1000 [...] profile
$groups xyz | grep abc
$ll jobScript
-r-xr+++-- 1 xyz abc 3000 [...] jobScript
$autorep -q -J jobName | egrep 'command|owner'
command: jobScript
owner: xyz
$
{{< / highlight >}}

When the Autosys job is executed, it fails with return code 1. This is correct since `xyz` doesn't have execute permission on profile.

{{< highlight bash >}}
$chmod 544 profile
$ll profile
-r-xr--r-- 1 abc abc 1000 [...] profile
$
{{< / highlight >}}

Now, the job runs fine!

Does it mean `xyz` is able to execute the profile with just read access? OR Autosys does something like this?

{{< highlight bash >}}
$cat profile > /home/xyz/tempProfile
$. tempProfile
$rm -f tempProfile
$. jobScript
{{< / highlight >}}

I need to check how Autosys sources the profile and invokes the command in detail. Drop in a comment if you have an explanation.

*[UPDATE - 11/4/2010]*

`xyz` is able execute the profile simple because scripts are interpreted! Each line from the script is first read and then executed. If there is a command in the profile which `xyz` doesn't have execute permission on, the execution will fail.

It is somewhat like my last guess with `tempProfile`. It is so easy to forget the basics. Stupid me!
