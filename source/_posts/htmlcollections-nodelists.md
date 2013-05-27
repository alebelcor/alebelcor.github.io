title: HTMLCollections & NodeLists
date: 2011-03-28 11:30:00
tags:
- JavaScript
- DOM
---

Most of us believed, at least for some time, that in our DOM Scripting, we
always dealt with arrays in our JavaScript:

```javascript
var myLinks = document.getElementsByTagName('a'); // we have three links

myLinks.length; // "3"
```

<!--more-->

We later found out that the things we thought were arrays, were instead
array-like objects. But how exactly are they like arrays? Those "array-like"
objects/elements/things, most of the time, are either HTMLCollections or
NodeLists, not native JavaScript array objects. Take a look at what the
specification says of them, the keyword is live:

{% blockquote DOM Level 1 http://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html#ID-75708506 %}
An HTMLCollection is a list of nodes. Collections in the HTML DOM are assumed
to be live meaning that they are automatically updated when the underlying
{% endblockquote %}

{% blockquote DOM Level 3 http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/DOM3-Core.html#core-ID-536297177 %}
The NodeList interface provides the abstraction of an ordered collection of
nodes, without defining or constraining how this collection is implemented.
odeList objects in the DOM are live.
{% endblockquote %}

But what does that mean? It means that live collections, if modified, are
updated as the program runs. For example, this is an infinte loop:

```javascript
var myLinks = document.getElementsByTagName('a'), // we have three links
    i,
    j;

for (i = 0, j = myLinks.length; i < j; i += 1 ) {
    document.body.appendChild(document.createElement('a'));
}
```

We're getting our collection (of three links) and then for each link that we
have, we're going to append another link to the body. So why is this infinite?
Because the collection is live, which means that not only will `i` increment,
`j` also will, so naturally the loop will keep going.

So why are they called array-like objects? If it looks like an array and acts
like an array, then it must be an array, right? Wrong, DOM collections look
like arrays because:

* They have an associated index to each value in the container. But that's
something an object can have too:

```javascript
var myObj = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three'
};

alert(myObj[0]); // 'zero'
alert(myObj[3]); // 'three'
```

The `alert` statements might look like they want the elements with index `0`
and `3` but you're really getting the value from the property named `0` and `3`.

* They have a `length` property. This is deceptive because arrays have this same
property, but so do HTMLCollections and NodeLists. But, because these are not
true arrays they do not have `push`, `concat`, `splice`or any of the other array
methods.

Be prepared, these are some of the DOM methods (that I know of) that return an
HTMLCollection or NodeList:

```javascript
// DOM Level 1/HTML 4.0
// ---------------------------
// Return an HTMLCollection
document.anchors
document.applets
document.forms
document.images
document.links

document.getElementsByName

formElement.elements
selectElement.options
tableElement.rows
tableElement.tBodies
tableRowElement.cells

// Not part of any standard
document.embeds
document.plugins

// DOM Level 2
// ------------------
// Return a NodeList
Node.childNodes

document.getElementsByName
document.getElementsByTagName
document.getElementsByTagNameNS
document.getElementsByName

element.getElementsByTagName
element.getElementsByTagNameNS

// WHATWG Web Applications 1.0
// ---------------------------
// Return a NodeList
document.getElementsByClassName
element.getElementsByClassName
```

Throughout this post I've been talking about `NodeLists` as such and not as live
`NodeLists` because they are inherintely live. There's an exception to this,
there are *static* `NodeLists` that act as snapshots and do not update when the
document is modified:

```javascript
// Selectors API Level 1
// ---------------------
// Return a static NodeList
document.querySelectorAll
element.querySelectorAll
```

In conclusion, I think it's important to know the differences between a live DOM
collection a true JavaScript array, it's also an important thing to be aware of
because you'll eventually interact with these.

I know so far I've been talking mostly about the DOM (sorry, this wasn't the
exception) but you cannot say that this was a boring topic, or was it?

Sources:

[Why is getElementsByTagName() faster than querySelectAll()?](http://goo.gl/Rsjsz)

[Speed Up Your JavaScript (video)](http://goo.gl/1j5SA)

[HTMLCollection - MDN Doc Center, NodeList - MDN Doc Center](http://goo.gl/EsmN4)

[DOM Level 1 Specification](http://goo.gl/PN66P)

[DOM Level 2 Specification](http://goo.gl/jDqpo)

[DOM Level 3 Specification](http://goo.gl/K6p1j)
