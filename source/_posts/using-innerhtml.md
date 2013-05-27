title: Using innerHTML
date: 2011-03-03 12:30:00
tags:
- JavaScript
- DOM
---

`innerHTML` is a read/write property of a DOM element that gets/sets the HTML
contained in the element.

<!--more-->

It's fast
---------

This might vary between browsers but, it's almost a fact that creating and
inserting elements using `innerHTML` instead of DOM methods is faster, not only
at execution time, it'll also make the script size lighter because less code is
needed.


It's clean & readable
---------------------

Although the name, `innerHTML`, might seem confusing at first, it comes as the
better choice in terms of code readability because DOM methods are very verbose
and can consume a lot of lines of code.


It's supported
--------------

It was first introduced by Microsoft as proprietary to IE and there's no spec
that defines the behavior of `innerHTML` but it has been adopted by all major
browsers because of its usefulness and it pretty much works the same in all of
them.

Creating and inserting using DOM methods:

```javascript
var newDiv = document.createElement('div');

newDiv.setAttribute('id', 'new-div');
newDiv.setAttribute('class', 'big-div');

var text = document.createTextNode('Some text here');
newDiv.appendChild(text);

document.body.appendChild(newDiv); // div is inserted in the tree
```

Creating and inserting using innerHTML:

```javascript
var newDiv = '<div id="new-div" class="big-div">Some text here</div>';

document.body.innerHTML = newDiv; // div is inserted in the tree</pre>
```


Reasons not to use it
---------------------

* Not standard. Although it's fast and it works, the bottom line is that it is
not part of any W3C or DOM standard. However, there are plans of adding it to
the HTML5 specification.
* XSS unsafe. You have to know when to use it, otherwise you are exposing your
application to XSS attacks, choose DOM methods until you're familiar with the
subject.
* Not implemented everywhere. There are some table related elements, in IE,
that can't be modified with it. The implementation and behavior might vary from
browser to browser.
* Destroys the children. Setting a value to `innerHTML` will destroy every
descendant to that element, if any of those descendants had event handlers,
that could potentially create a memory leak in some browsers.

Sources:

[innerHTML (Mozilla Developer Network)](http://goo.gl/PKHtg)

[innerHTML (Microsoft Developer Network)](http://goo.gl/UUyIw)
