+++
title = "Remove Commas From Values in CSV File"
description = "Not the commas that separate the values."
slug = "../Remove-Commas-From-Values-in-CSV-File"
author = "Lobo"
comments = "true"
date = "2013-03-11 20:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["unix", "sed", "csv", "backdated post"]
+++

<small>The [latest version](https://github.com/lobopraveen/gists/blob/master/unix/remove_comma_from_values_in_csv_file.md) of this should be available on [GitHub repo](https://github.com/lobopraveen/gists). Please report any issues there.</small>

CSV files with values that contain commas in them is a pain if the system was built to handle the basic CSV format. This is especially true if the process that has been running for ages fails one day in production and it turns out that the file to process has a value that contains a comma in it.

What would you do if this happened at mid-night during the batch process? Would you fix the CSV implementation or contact the source of the feed to get it fixed? The former was a non-starter; keeping the SLA in mind and the response from the vendor, we resorted to almighty UNIX tools!

#### SED to the rescue

There were two columns that were causing the problem. One had a comma and the other could have up to two commas. `sed` to replace text based on pattern matching with back-referencing was godsend. It took a few minutes of trial and error of course!

Sample dataset:
```
VERIFIED,"Apr 30, 2004 12:00 AM",Jon Doe,"3,000,000.00"
UNVERIFIED,"Jan 30, 2013 12:00 AM",Jane Doe,"20,000.00"
```

The following `sed` command removes the comma from the values where the values may have one comma.

```sh
sed 's/\("[^,]\{1,\}\),\([^,^"]\{1,\}"\)/\1\2/g' filename
```

Explanation:

- `s` substitution
- `\(` and `\)` grouping and escaping parenthesis
- `[^,]` matches any character but a comma
- `\{1,\}\` matches one or more occurrences of the previous match
- `"[^,]\{1,\}\)` subexpression matches the value starting with a double-quote followed by one or more character until a comma
- `,` matches a single comma
- `[^,^"]\{1,\}"` subexpression matches the rest of the value followed by a double-quote as long as the rest of the value doesn't include a comma or a double-quote. Notice how it doesn't match the "3,000,000.00"
- `\1\2` the replacement side of the `sed` uses the back-referencing to refer to the text matched by the subexpressions
- `g` replace globally

Result:
```
VERIFIED,"Apr 30 2004 12:00 AM",Jon Doe,"3,000,000.00"
UNVERIFIED,"Jan 30 2013 12:00 AM",Jane Doe,"20000.00"
```

The value "3,000,000.00" still has commas. This is because it has more than one comma and our patterns don't match; read explanation above. This can be easily fixed by duplicating the second subexpression preceded by a match for a comma and `\3` on the replacement side.

```sh
sed 's/\("[^,]\{1,\}\),\([^,^"]\{1,\}\),\([^,^"]\{1,\}"\)/\1\2\3/g' filename
```

Result:
```
VERIFIED,"Apr 30, 2004 12:00 AM",Jon Doe,"3000000.00"
UNVERIFIED,"Jan 30, 2013 12:00 AM",Jane Doe,"20,000.00"
```

Oops! It only matches the values with two commas. To remove the commas from the values where the values may have up to two commas just combine the two patterns from above.

```sh
sed -e 's/\("[^,]\{1,\}\),\([^,^"]\{1,\}"\)/\1\2/g' \
    -e 's/\("[^,]\{1,\}\),\([^,^"]\{1,\}\),\([^,^"]\{1,\}"\)/\1\2\3/g' filename
```

Result:
```
VERIFIED,"Apr 30 2004 12:00 AM",Jon Doe,"3000000.00"
UNVERIFIED,"Jan 30 2013 12:00 AM",Jane Doe,"20000.00"
```

This can be expanded to remove when values have more commas as long as the maximum number of commas in any value is known. I'm sure this can be simplified and made elegant to deal with any number of commas. How would you do it? Using sed, awk, or perl? Let me know and I will add it here.

<small>_All posts with [backdated post](/tags/backdated-post) tag are published long after they were written._</small>
