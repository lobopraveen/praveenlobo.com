+++
title = "jQuery v1.6 Checkbox issue"
description = "attr() vs prop()"
slug = "../jquery-v1-6-checkbox-issue-attr-vs-prop"
author = "Lobo"
comments = "true"
date = "2011-06-14 06:32:09"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "jQuery", "stackoverflow", "checkbox"]
+++


I have been visiting Stackoverflow a lot recently. This is a cool forum where you not only get your questions answered but also learn. Learn a lot, in fact. I always enjoy learning from others' experience and mistakes; it's dirty but it is also very easy and fast. This is exactly what Stackoverflow is providing me; an opportunity to learn from others' knowledge. I'm also having fun with their reputation points.

I was trying to answer [this](https://stackoverflow.com/questions/6338987/correct-select-all-checkbox-with-jquery) question (which deals with a master and a number of checkboxes) and came up with a code which worked **only** in jQuery version <1.6

{{< highlight JavaScript >}}
// Code that works with <1.6; uses attr()
$(function () {
    $("#checkall").click(function () {
        $(this).parents("fieldset:eq(0)").find(":checkbox").attr("checked", this.checked);
    });
        $("input[type=checkbox]:not(#checkall)").click(function(){
        if(!this.checked) {
            // at least one is unchecked; uncheck checkall
            $("#checkall").attr("checked", this.checked);
        } else {
            // check if all are checked and set checkall accordingly
            $("#checkall").attr("checked",!$("input[type=checkbox]:not(#checkall)").filter(":not(:checked)").length);
        }     

    });
});
{{< / highlight >}}


After a couple of minutes of tinkering, it just occurred to me that this was due to the  [prop](https://api.jquery.com/prop/) method that I read about a day or two earlier. Just changing the `attr` to `prop` worked like a charm.

However, I didn't know how to fix it and this is where the community knowledge came to the rescue. A user named [Matt Ball](https://stackoverflow.com/users/139010/matt-ball) pointed me to his `jQuery-CheckAll` plugin and asked me to take a look.

The fix was/is to check if prop exists or not and use it if it does. Notice the syntax of calling the prop/attr method in below code.

{{< highlight JavaScript >}}
// Code that works with any version; uses attr()/prop()
$(function() {
    // Ripped from https://github.com/mjball/jQuery-CheckAll
    var propFn = typeof $.fn.prop === "function" ? "prop" : "attr";

    $("#checkall").click(function() {
        $(this).parents("fieldset:eq(0)").find(":checkbox")[propFn]("checked", this.checked);
    });
    $("input[type=checkbox]:not(#checkall)").click(function() {
        if (!this.checked) {
            // at least one is unchecked; uncheck checkall
            $("#checkall")[propFn]("checked", this.checked);
        } else {
            // check if all are checked and set checkall accordingly
            $("#checkall")[propFn]("checked", !$("input[type=checkbox]:not(#checkall)").filter(":not(:checked)").length);
        }

    });
});
{{< / highlight >}}


My answer to that question - [here](httsp://stackoverflow.com/questions/6338987/correct-select-all-checkbox-with-jquery/6339196#6339196).
Read more about prop() in v1.6 [here](https://ejohn.org/blog/jquery-16-and-attr/).

{{< highlight html >}}
<fieldset>
    <div class="radio"><input type="checkbox" name="checkall" id="checkall"> <label for="checkall">Check all</label></div>
    <div class="radio"><input type="checkbox" name="checkbox1" id="checkbox1"> <label for="checkbox1">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox2" id="checkbox2"> <label for="checkbox2">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox3" id="checkbox3"> <label for="checkbox3">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox4" id="checkbox4"> <label for="checkbox4">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox5" id="checkbox5"> <label for="checkbox5">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox6" id="checkbox6"> <label for="checkbox6">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox7" id="checkbox7"> <label for="checkbox7">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox8" id="checkbox8"> <label for="checkbox8">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox9" id="checkbox9"> <label for="checkbox9">Checkbox</label></div>
    <div class="radio"><input type="checkbox" name="checkbox10" id="checkbox10"> <label for="checkbox10">Checkbox</label></div>
</fieldset>
{{< / highlight >}}
