+++
title = "SQL Error Converting The Data Type"
description = "Only in some environments!"
slug = "../SQL-Error-Converting-The-Data-Type "
author = "Lobo"
comments = "true"
date = "2017-07-21 20:00:00"
timezone = "CST"
categories = ["1"]
tags = ["sql", "query", "backdated post"]
+++

A team mate of mine approached me asking for help in debugging an issue that has been ongoing for a while. He mentioned that the issue with query he was dealing with was sporadic and doesn't happen in all environments. That sounded interesting. I asked him to pull up a chair so we can go over it together. 

The problem was with a query that used to run fine for a long time and started failing a couple of weeks ago. This had caused manual work for his team each time it failed. The error was with some conversion he said.

```sql

Msg 8114, Level 16, State 5, Line 1
Error converting data type nvarchar to bigint.
```

This was on going for a while until one more query started fail. This time the error message had a little more clue and this is when it was taken seriously. 

```sql
Msg 245, Level 16, State 1, Line 1
Conversion failed when converting the nvarchar value 'ABC' to data type int.
```

I asked him the obvious - did you make sure you are not comparing a string to an integer? He showed me each and every column in the query along with all the possible values. There was no string to integer business. The query was something like this. 

```sql
WITH ReportKey AS ( 
  SELECT RKey 
  FROM   dbo.fnGetKeysForReport(param1, param2)
)

SELECT Column1, Column2
FROM   TableName T
          INNER JOIN ReportKey K ON K.RKey = T.SomeKey 
```

He had listed all possible values for param1, param2, RKey, SomeKey. He had also ran the `dbo.fnGetKeysForReport()` function for all of the possible params and it never failed. 

After a brief discussion about the query optimizer, query execution plans, inline table values functions etc. I pointed out that the `K.RKey = T.SomeKey` was the problem. His assumption was that the common table expression (CTE) would execute first and the resulting RKey would always be an integer as all combination of params to the function always returned integers. This was incorrect; the query optimizer had other plans. In one of the error messages, the value 'ABC' was mentioned. When we went to the actual table where RKey was stored, the very first row on that table had the value 'ABC' so it was clear what the query optimizer was trying to do. 

The query optimizer had decided to expand the inline table valued function to bring in all possible values of RKey from the underlying table first and was trying to store the values as integers as the column it was being compared against was of type integer. Key thing here was that it wasn't applying any WHERE clause from that function yet and hence the conversion error. 

It is a good idea to use the accurate data type while storing the data. Using nvarchar as it allows to store other types such as integer is a bad design. In this case, the usage was reasonable and at this point it wasn't feasible to redesign the whole thing. I offered him two options - 
1. Update the LHS of the expression to make sure the value is always an integer to avoid the conversion error.
1. Update the RHS of the expression to make sure the value is always nvarchar to avoid the need for conversion. 

We picked option 1 as the underlying problem was with RKey (RHS side of the expression) and it conveyed a subtle message to the future reader that this value needs conversion. When the value was not numeric, we used -1 as T.SomeKey can never be -1. Of course, we added comments explaining why the conversion was needed. 

```sql
INNER JOIN ReportKey K ON IIF(ISNUMERIC(K.RKey) = 1, K.RKey, -1) = T.SomeKey 
```
> Why did the query fail only in one environment? That too after working fine for so long? 

There was some recent change to the query and it was promoted to higher environment. When we looked at the failures, it started occurring exactly the day the change was promoted. Ditto with the second query as well. The recent changes had forced the optimizer to redo the execution plan and the one picked was different than the previous one leading to the conversion error. The same queries were running fine in the lower environment as the optimizer was picking a different execution plan. 

The important thing to remember is that the way we write the query is not necessarily the same way the optimizer decides to run it. Also, write the query to make it easy for humans to understand and leave it to the optimizer to pick the best way to execute it.

<small>_All posts with [backdated post](/tags/backdated-post) tag are published long after they were written._</small>
