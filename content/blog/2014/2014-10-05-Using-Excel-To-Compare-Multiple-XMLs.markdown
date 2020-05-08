+++
title = "Using Excel To Compare Multiple XMLs"
description = "Taking it a step further"
slug = "../Using-Excel-To-Compare-Multiple-XMLs"
author = "Lobo"
comments = "true"
date = "2014-10-05 00:00:00"
timezone = "CDT"
categories = ["1"]
tags = ["XML", "VBA", "excel", "power query"]
+++

The VBA code from [last post](/blog/comparing-two-xmls-in-excel-vba) explains how two XML strings that are already on the spreadsheet can be compared. This can be extended to add a search functionality to search and bring in the XML before running the comparison.

#### Search File:

To get a matching line from a file, use VBA code as shown [here](https://github.com/lobopraveen/gists/blob/master/msexcel/vba_extract_matching_line_from_a_file.vba) on the gists repo I maintain. Or just use power query as shown below and place the result in the XML cell. Note that the power query returns all matching lines as opposed to the aforementioned VBA code which returns the first occurrence. The VBA code can be edited to return multiple lines if needed.

```m
let
    KeySource = Excel.CurrentWorkbook(){[Name="SearchKeys"]}[Content],
    KeysWithoutNull = Table.SelectRows(KeySource, each [Keys] <> null),
    DistinctKeyList = List.Distinct(KeysWithoutNull[Keys]),
    TxtFileData = Table.FromColumns({Lines.FromBinary(File.Contents("File_Location_here"))}),
    FilteredRows = Table.SelectRows(TxtFileData, each List.AnyTrue(List.Transform(DistinctKeyList, (substring) => Text.Contains([Column1], substring)))),
    MatchingLines = Table.RenameColumns(FilteredRows,{{"Column1", "Lines From File"}})
in
    MatchingLines
```    

The code assumes that the key to search is in a table named "SearchKeys".

#### Search Database:
Power query makes like easy to run a query against a database.


```m
let
    KeySource = Excel.CurrentWorkbook(){[Name="SearchKeys"]}[Content],
    KeysWithoutNull = Table.SelectRows(KeySource, each [Keys] <> null),
    DistinctKeyList = List.Distinct(KeysWithoutNull[Keys]),
    OneLiner = List.Accumulate(DistinctKeyList,"",(state,current)=>if state = "" then "'"& Text.From(current)&"'" else state & ",'"& Text.From(current) &"'" ),
    DBData = Sql.Database("server", "db", [Query="SELECT * FROM dbo.tablename WHERE somecolumn IN ("& OneLiner &")"])
in
    DBData
```

Using the snippets shown above XML strings to compare can be brought in to the spreadsheet before running the comparison. This way an XML string from a file can be compared to another one from a different file or even a database.

#### Comparing multiple XML strings:
The VBA code from [previous post](/blog/comparing-two-xmls-in-excel-vba) talked about comparing a single XML. That same code can be put in a loop to compare multiple XML strings. The use case below lists a set of keys for which the matching XML strings from a file needs to be compared to matching XML strings from a database.

{{< center >}}
{{< figure src="/media/51-75/53-excel-xml-compare/search_and_compare_multiple_XMLs.png" link="/media/51-75/53-excel-xml-compare/search_and_compare_multiple_XMLs.png" alt="search_and_compare_multiple_XMLs.png" caption="Compare multiple XML strings" >}}
{{< /center >}}

The "SearchKeys" mentioned above is a table and can take multiple rows/keys. There are three keys in the screenshot shown above (refer column A).

1. The "Search File" can be assigned to a macro that refreshes the connection for the file search power query from above. The result of the power query should go to the "file" sheet.
```csharp
ThisWorkbook.Connections("Query - FileSearch").Refresh
```

1. The "Search DB" can run the database search power query and load the "database" sheet.
```csharp
ThisWorkbook.Connections("Query - DBSearch").Refresh
```

1. Loop through the keys
   1. find the matching XML from the "file" sheet and the "database" sheet
   1. run the xml compare using the same strategy from previous post.


Following code can be used to find the matching XML from a list that is already loaded into one of the sheets.

```csharp
'
' returns the first xml that matches a given key on a given sheet
' Note: assumes column A has the xmls starting at row 2
'
Function GetFileXML(SheetName As String, Key As String) As String
    Dim xml As Range
    Set xml = ThisWorkbook.Sheets(SheetName).Range("A2")

    Do Until IsEmpty(xml)
        If InStr(1, xml.Text, Key, vbTextCompare) > 0 Then
            GetFileXML = xml.Text
            Exit Function
        End If
        Set xml = xml.Offset(1, 0)
    Loop
End Function
```

In the code below, I added `GetDBXML()` function just to demonstrate another use case where the database result has two columns - the actual key and the XMl string. The function searches the key column by passing the text from key column `xml.Offset(0, -1).Text` to the `InStr` function.


```csharp
'
' MIT License
'
' Copyright (c) 2018 Praveen Lobo (praveenlobo.com)
'
' Permission is hereby granted, free of charge, to any person obtaining a copy
' of this software and associated documentation files (the "Software"), to deal
' in the Software without restriction, including without limitation the rights
' to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
' copies of the Software, and to permit persons to whom the Software is
' furnished to do so, subject to the following conditions:
'
' The above copyright notice and this permission notice shall be included in all
' copies or substantial portions of the Software.
'
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
' IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
' FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
' AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
' LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
' OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
' SOFTWARE.
'

'
' Refreshes the key list and searches for those keys in the file using the FileSearch power query
'
Sub RefreshFileSearch()
    ClearPreviousResults
    ThisWorkbook.Connections("Query - FileSearch").Refresh
End Sub

'
' Refreshes the key list and searches for those keys in the databse using the DBSearch power query
'
Sub RefreshDBSearch()
    ClearPreviousResults
    ThisWorkbook.Connections("Query - DBSearch").Refresh
End Sub

'
' Returns the range of previous compare results
'
Function CompareResultRange() As Range
    On Error Resume Next
    ThisWorkbook.Sheets("Main").ShowAllData
    On Error GoTo 0
    ThisWorkbook.Sheets("Main").Range("C2").Select
    ' Select all down only if there is any value
    If IsEmpty(Range("C2").Offset(1, 0).Value) = False Then
        Range(Selection, Selection.End(xlDown)).Select
    End If

    ' Extend the selection to add six columns
    Selection.Resize(Selection.Rows.count, 6).Select
    Set CompareResultRange = Selection
End Function

'
' Clears the previous results
'
Sub ClearPreviousResults()

    With CompareResultRange()
        .ClearContents
        .FormatConditions.Delete
        .Interior.Color = xlNone
        With .Borders
            .LineStyle = xlNone
        End With
    End With

    ThisWorkbook.Sheets("Main").Range("C2").Select
    ActiveWindow.ScrollRow = 1
End Sub

'
' returns the first xml that matches a given key on a given sheet
' Note: assumes column A has the xmls starting at row 2
'
Function GetFileXML(SheetName As String, Key As String) As String
    Dim xml As Range
    Set xml = ThisWorkbook.Sheets(SheetName).Range("A2")

    Do Until IsEmpty(xml)
        If InStr(1, xml.Text, Key, vbTextCompare) > 0 Then
            GetFileXML = xml.Text
            Exit Function
        End If
        Set xml = xml.Offset(1, 0)
    Loop
End Function

'
' returns the first xml from a row that matches a given key on a given sheet.
' Note: assumes that column A has the keys and columb B has the xmls starting row 2
'
Function GetDBXML(SheetName As String, Key As String) As String
    Dim xml As Range
    Set xml = ThisWorkbook.Sheets(SheetName).Range("B2")

    Do Until IsEmpty(xml)
        If InStr(1, xml.Offset(0, -1).Text, Key, vbTextCompare) > 0 Then
            GetDBXML = xml.Text
            Exit Function
        End If
        Set xml = xml.Offset(1, 0)
    Loop
End Function

'
' Compares the two XMLs and displays mismatches
'
Sub CompareXMLs()
    ClearPreviousResults
    Dim CompareResultCell As Range
    Set CompareResultCell = ThisWorkbook.Sheets("Main").Range("C2")

    Dim xml As MSXML2.DOMDocument
    Set xml = New MSXML2.DOMDocument
    xml.async = False: xml.ValidateOnParse = False

    Dim SourceTagTagDict As Object
    Set SourceTagTagDict = CreateObject("Scripting.Dictionary")
    SourceTagTagDict.CompareMode = vbBinaryCompare

    Dim xmlString As String
    Dim XmlNodes As IXMLDOMNodeList
    Dim XmlNode As IXMLDOMNode

    Dim Key As Range
    Set Key = ThisWorkbook.Sheets("Main").Range("A2")

    Dim count As Integer: count = 0
    Dim CompareResult As String
    Dim MissingSource As Boolean: MissingSource = False
    Dim MissingTarget As Boolean: MissingTarget = False

    ' loop through each key and compare
    Do Until IsEmpty(Key)
        MissingSource = False
        MissingTarget = False
        SourceTagTagDict.RemoveAll

         ' Get the file xml string and cleanup
        xmlString = GetFileXML("file", Key.Text)

        If Not xml.LoadXML(xmlString) Then
            MissingSource = True
            GoTo SkipSource
        End If

        Set XmlNodes = xml.ChildNodes().Item(0).ChildNodes() 'Because We have only one XML document

        ' load the dictionary with tag and value
        For Each XmlNode In XmlNodes
            SourceTagTagDict.Add XmlNode.BaseName, XmlNode.Text
        Next XmlNode

SkipSource:

        ' Get the DB xml string and clean up
        xmlString = GetDBXML("database", Key.Text)

        If Not xml.LoadXML(xmlString) Then
            MissingTarget = True
            GoTo SkipTarget
        End If

        Set XmlNodes = xml.ChildNodes().Item(0).ChildNodes() 'We have only one XML document

SkipTarget:

        If MissingSource Or MissingTarget Then
            CompareResultCell.Value = Key.Text
            CompareResultCell.Offset(0, 1).Value = "NA"
            CompareResultCell.Offset(0, 2).Value = "NA"
            CompareResultCell.Offset(0, 3).Value = "NA"
            CompareResultCell.Offset(0, 4).Value = "Missing " & IIf(MissingSource, "File ", "") & IIf(MissingTarget, "DB ", "") & "XML"
            Set CompareResultCell = CompareResultCell.Offset(1, 0)
            count = count + 1
            GoTo NextKeyCell
        End If

        ' we have xmls from file and db both. compare.
        For Each XmlNode In XmlNodes
            If SourceTagTagDict.Exists(XmlNode.BaseName) Then
                ' File xml matching tag exists

                If StrComp(XmlNode.Text, SourceTagTagDict.Item(XmlNode.BaseName), vbBinaryCompare) <> 0 Then
                    ' the value don't match
                    CompareResult = "Mismatch"
                    count = count + 1
                Else
                    ' the values match
                    CompareResult = "Match"
                End If

                ' load the result
                CompareResultCell.Value = Key.Text
                CompareResultCell.Offset(0, 1).Value = XmlNode.BaseName
                CompareResultCell.Offset(0, 2).Value = SourceTagTagDict.Item(XmlNode.BaseName)
                CompareResultCell.Offset(0, 3).Value = XmlNode.Text
                CompareResultCell.Offset(0, 4).Value = CompareResult

                ' remove the key from dictionary
                SourceTagTagDict.Remove (XmlNode.BaseName)
            Else
                ' No File XML matching tag; this is only in DB
                CompareResultCell.Value = Key.Text
                CompareResultCell.Offset(0, 1).Value = XmlNode.BaseName
                CompareResultCell.Offset(0, 3).Value = XmlNode.Text
                CompareResultCell.Offset(0, 4).Value = "DB Tag Only"

                count = count + 1
            End If

            ' move the cell one down
            Set CompareResultCell = CompareResultCell.Offset(1, 0)

        Next XmlNode

        ' Loop through File XML tag dictionary and print. Theese are in File xml only
        Dim FileOnlyTag As Variant
        For Each FileOnlyTag In SourceTagTagDict.Keys()
            CompareResultCell.Value = Key.Text
            CompareResultCell.Offset(0, 1).Value = FileOnlyTag
            CompareResultCell.Offset(0, 2).Value = SourceTagTagDict.Item(FileOnlyTag)
            CompareResultCell.Offset(0, 4).Value = "File Tag Only"

            ' move the cell one down
            Set CompareResultCell = CompareResultCell.Offset(1, 0)
            count = count + 1
        Next FileOnlyTag


NextKeyCell:
        ' read the next key
        Set Key = Key.Offset(1, 0)

    Loop ' Do Until


    ' add border
    With CompareResultRange()
        With .Borders
            .LineStyle = xlContinuous
        End With
    End With
    ThisWorkbook.Sheets("Main").Range("C2").Select

    If count > 0 Then
        MsgBox (count & " mismatches found!")
    Else
        MsgBox ("Success: XMLs match!")
    End If
End Sub
```

<small>The [latest version](https://github.com/lobopraveen/gists/blob/master/msexcel/xmlcompare/search_and_compare_multiple_XMLs.vba) of this should be available on [GitHub repo](https://github.com/lobopraveen/gists). Please report any issues there.</small>

A sample excel file is also provided on the GitHub repo - [direct link](https://github.com/lobopraveen/gists/blob/master/msexcel/xmlcompare/search_and_compare_multiple_XMLs.xlsb?raw=true). Please note that the links to the file and the database info needs to be updated to suit the needs.

If you make any enhancement like color coding the result to make it more visual or make the code better in anyway, please submit a pull request and pass on the goodness!
