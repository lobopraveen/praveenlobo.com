+++
title = "How to scroll elements smoothly in JavaScript/jQuery "
description = "without plugins"
slug = "how-to-scroll-elements-smoothly-in-javascript-jquery-without-plugins"
author = "Lobo"
comments = "true"
date = "2011-08-11 02:08:01"
timezone = "CDT"
categories = ["1"]
tags = ["JavaScript", "scroll", "jQuery", "HTML"]
+++



There are multitude of ways to scroll the page to bring certain elements to view through code. A few of them below. The code given below can be used to scroll any element with an ID on the page. The [demo](/media/38-scroll/ScrollDemo.html) scrolls the page as well as the contents of a `DIV` and bring an element to view. These methods also use jQuery's `animate()` method. To best view the code in action click on RESET before clicking on the buttons.

Do you have a better way of scrolling elements? Ideas/comments/suggestions are always welcome.


---

#### The simplest one will be to use **an anchor tag**:
Note that the anchor can be used on any element with an ID. This works exactly the same as `scrollIntoView(true)` - see [2] below

{{< highlight JavaScript >}}

<A href="#element">Scroll to element</A>
..
<DIV id="element">...</DIV>
{{< / highlight >}}


#### **[1] JavaScript scrollTo method**:
This method takes coordinates on x and y axis to scroll.  The problem with this approach is that if the element to scroll is inside another element which has a scrollbar, it will not work as one might expect.

{{< highlight JavaScript >}}
function scroll(element){
 var ele = document.getElementById(element);
 window.scrollTo(ele.offsetLeft,ele.offsetTop);
}
{{< / highlight >}}


#### **[2] JavaScript scrollIntoView(alignWithTop) method**:
`alignWithTop=true` will align the element with the top of the scroll area.

{{< highlight JavaScript >}}
function scroll(element, parent){
  $(element)[0].scrollIntoView(true);
}
{{< / highlight >}}


#### **[3] JavaScript scrollIntoView(alignWithTop) method**:
`alignWithTop=false` will align the element with the bottom of the scroll area.

{{< highlight JavaScript >}}
function scroll(element, parent){    
   $(element)[0].scrollIntoView(false);
}
{{< / highlight >}}


#### **[4] By adjusting scrollTop**:
I think, this is the most commonly used/suggested way. However, if you try to scroll again, the scrolling goes for a toss. Try clicking on scroll twice on the demo page.  

{{< highlight JavaScript >}}
function scroll(element, parent){
    $(parent).animate({ scrollTop: $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
}
{{< / highlight >}}


#### **[5] scrollIntoView(alignWithTop) and by adjusting scrollTop**:
This is just a combination of [2] and [4]   

{{< highlight JavaScript >}}
function scroll(element, parent){
    $(parent)[0].scrollIntoView(true);
    $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
}
{{< / highlight >}}




#### **[6] scrollIntoView(alignWithTop) and by adjusting scrollTop**:
This is a combination of [3] and [4]

{{< highlight JavaScript >}}   
function scroll(element, parent){
    $(parent)[0].scrollIntoView(false);
    $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
}
{{< / highlight >}}




#### **[7] Using scrollTop and animation**:
This is same as [5] but scrolls smoothly.

{{< highlight JavaScript >}}
function scroll(element, parent){
    $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
    $('html,body').animate({ scrollTop: $(parent).offset().top }, { duration: 1000, easing: 'swing'});
}
{{< / highlight >}}


#### **[8] Using scrollTop and animation**:
This is same as [6] but scrolls smoothly.

{{< highlight JavaScript >}}
function scroll(element, parent){
    $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
    $('html,body').animate({ scrollTop: $(parent).offset().top - $(window).height() + $(element).height() }, { duration: 1000, easing: 'swing'});
}
{{< / highlight >}}


#### **[9] Using scrollTop and animation**:
This is essentially same as the last two methods except that this one will scroll the the page to bring the parent element to align the top with 1/3rd of the viewport.  

{{< highlight JavaScript >}}
function scroll(element, parent){
    $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, { duration: 'slow', easing: 'swing'});
    $('html,body').animate({ scrollTop: $(parent).offset().top - ($(window).height()/3) }, { duration: 1000, easing: 'swing'});
}
{{< / highlight >}}



#### **Reset scroll**:
This method will remove scroll from all elements on the page.

{{< highlight JavaScript >}}
function resetAllScroll(){
 $("*").animate({ scrollTop: 0}, { duration: 'slow', easing: 'swing'});
}
{{< / highlight >}}


---

Check out the [demo](/media/38-scroll/ScrollDemo.html) and let me know what you think. To best view the code in action click on RESET before clicking on the buttons.
