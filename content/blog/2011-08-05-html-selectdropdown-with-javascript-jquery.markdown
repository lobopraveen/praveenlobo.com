+++
title = "HTML SELECT/Dropdown with JavaScript/jQuery"
description = "Common operations"
slug = "html-select-dropdown-with-javascript-jquery"
author = "Lobo"
comments = "true"
date = "2011-08-05 03:54:08"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "jQuery", "HTML", "Dropdown"]
+++


A list of commonly needed operations on HTML SELECT/Dropdown using JavaScript/jQuery. Let me know if you find it useful or if you have additions/suggestions to improve the list.


### JavaScript


{{< highlight JavaScript >}}

// get the element
var dd =  document.getElementById("dropdown");

// Get the total number of options
dd.length;

// Get the index of selected option
dd.selectedIndex;

// get the value of selected option  
dd.options[dd.selectedIndex].value;

// Get the selected option/text
dd.options[dd.selectedIndex].text;

// Reset the dropdoown option; select first option
dd.selectedIndex = 0;

// Reset the dropdoown option; select last option  
dd.selectedIndex = dd.length-1;

// Create and attach an option dynamically
var newOption = document.createElement('option');
// create option/text
newOption.text="new option";  
// create option value
newOption.value="new value";
// attach the option to the dropdown
dd.options[dd.options.length] = newOption;  

// Create and attach an option dynamically
dd.options[dd.options.length] =
new Option("new option","new value");

// Create and attach an option dynamically
dd.add(new Option("new option 2","new value 2"));

// Remove all options from the dropdown
dd.length = 0;

// Remove all options from the dropdown
dd.options.length = 0;

// Remove the first option from the dropdown
dd.remove(0);

// Remove the last option from the dropdown
dd.remove(dd.options.length-1);

// Remove the last option from the dropdown
dd.remove(dd.length-1);

// Remove the dropdown/select element.
// ParentID must be an ID of the parent element.
document.getElementById("ParentID").removeChild(dd);

{{< / highlight >}}



### jQuery

{{< highlight JavaScript >}}

// Reset the dropdoown option; select first option
$("#dropdown").prop("selectedIndex",0);

// Reset the options on all SELECT/Drodown elements.
$("select").each(function(){
    $(this).find("option:first").prop("selected","selected");
});  

// Reset the options on all SELECT/Drodown
// elements to last option
$("select").each(function(){
    $(this).val($("option:last",this).val());
});  

// Get the value of the selected option/text
$("#dropdown").val();

// Get the index of selected option
$("#dropdown").prop("selectedIndex");

//  Get the selected text
$("#dropdown option:selected").text();

// Get ALL text in the SELECT element; space separated
$("#dropdown").text();

// Select an option with value
// selects the option with value="value-2"
$("#dropdown").val("value-2");

// Add an option
$("#dropdown").append("<OPTION value="value-new">option-new</OPTION>");

// Remove the last option from SELECT
$("#dropdown option:last").remove();

// Remove all options from SELECT
$("#dropdown option").remove()

// Remove the SELECT element from DOM
$("#dropdown").remove()

{{< / highlight >}}
