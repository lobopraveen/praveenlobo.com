+++
title = "O_ops: Better Logging To Solve Problems"
description = ""
slug = "../oops-better-logging-to-solve-problems"
author = "Lobo"
comments = "true"
date = "2011-07-13 03:52:23"
timezone = "CDT"
categories = ["1"]
tags = ["oops", "script", "UNIX"]
+++


Logging helps in pinpointing the code block that threw an error. Only if they are used correctly. During once such failure, a guy noticed that a script lacked logging and ever promptly promoted the updated script with better logging. A part of the script is shown below.

Script before:
{{< highlight bash >}}
1>>${LOG} 2>>${ERRLOG} ${BINPATH}/${PROGRAMNAME}
if [ $? -ne 0 ]; then
  print "ERROR: Something failed"
  exit 101
fi
{{< /highlight >}}

Script after:

{{< highlight bash >}}
1>>${LOG} 2>>${ERRLOG} ${BINPATH}/${PROGRAMNAME}
echo "Program completed successfully."
if [ $? -ne 0 ]; then
  print "ERROR: Something failed"
  exit 101
fi
{{< / highlight >}}


The change made it a "better" script for sure - it never failed again!
