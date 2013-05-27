title: The script tag and the DOM
date: 2011-02-07 13:00:00
tags:
- JavaScript
- DOM
---

Today I'm going to talk about the DOM. Things you might not know, tricks,
nuances and some best practices (I think). So, let's get to it.

<!--more-->

`<script>`
----------

It first appeared in Netscape Navigator 2 as a way to put programs in HTML
documents and it then became part of the HTML standard in version 4.

```html
<script type="text/javascript">...</script>
```


`<!-- // -->`
-------------

The `<!-- // -->` hack was a workaround to prevent HTML documents from
displaying JavaScript code by browsers that didn't understand it. You can still
see this pattern in pages but it's no longer necessary as today's browsers
understand both the script tag and JavaScript.

```html
<script type="text/javascript">
<!--
  code here
// -->
</script>
```


The `language` attribute
------------------------

Microsoft came up with it as a way to select what kind of language (e.g.
VBScript) you wanted to use for your program. The W3C deprecated this in favor
of the `type`. Avoid the `language` attribute.

```html
<script language="javascript" type="text/javascript">...</script>
```


The `src` attribute
-------------------

It allows you to load a script from an external file. Great, because you don't
want to put JavaScript in your HTML, for a large number of reasons: it makes the
HTML file heavier, it becomes less maintainable, it becomes less scalable, it's
not cachable, it becomes hard to minify or inspect, etc. It is highly
recommended that you do not write JavaScript in your HTML and instead use the
`src` attribute.

```html
<script type="text/javascript" scr="js/script.js"></script>
```


The `type` attribute
--------------------

The W3C added the `type` attribute to replace the `language` one. It takes a
MIME type instead of the name of the language. The official MIME type for
JavaScript is `application/javascript` or `application/ecmascript` and the most
up to date browsers understand this, but not IE. So, if you want cross-browser
support (and you should) you have to use `type="text/javascript"`, at least for
now. This is a required attribute for HTML validation, but in practice you can
just leave this out, the default language on all major browsers is JavaScript
and besides if you're using `src` it ignores it.

```html
<script type="text/javascript">...</script>
<script>...</script>
<script type="text/javascript" src="js/script.js">...</script>
<script src="js/script.js">...</script></pre>
```


Loading time
------------

Because of the way the browser works, loading of a page's assets is incremental
and single-threaded, it is recommended that the `script` tags be placed as low
in the `body` as possible. It is also recommended to place your CSS i.e. `link`,
as high in the `head` as possible, this will greatly improve the user experience.

You should also minify, gzip and join your script files into one. These will
reduce file size and the number of HTTP requests and thus, the time it takes for
the browser to load the page.

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <!-- head contents here -->
  </head>
  <body>
    <!-- body contents here -->
    <script type="text/javascript" src="js/script.js"></script>
  </body>
</html>
```

`document.write`
----------------

If you call this before the `onload` event triggers it will insert stuff into
your document, but if you do it after it, it destroys your document and replace
it with new stuff. You should avoid using `document.write`, there are better
alternatives now.


Collections
-----------

* `document.anchors`
* `document.applets`
* `document.embeds`
* `document.forms`
* `document.frames`
* `document.images`
* `document.plugins`
* `document.scripts`
* `document.stylesheets`

Netscape provided these as a way to get and modify elements easier. These are
still available but obsolete and you should avoid using them as there are better
alternatives now.


The `name` and `id` attributes
------------------------------

If an element didn't have an `id` but it had a `name` with the same value, you
could still get access to it via DOM methods. They used to be interchangeable
but they are not anymore.

### The HTML:

```html
<input type="text" name="firstname" value="my value">
```

### The JavaScript:

```javascript
var input = document.getElementById('firstname');
input.value = 'another value'; // sets a value to "firstname" field
```


`document.all`
--------------

Microsoft came up with this as a type of super collection that contained any tag
that had a `name` or `id`. Since this is propriety thing and not cross-browser,
it is best to not use it.

Some of the topics that I did not cover in this post were browser history, how a
browser works and document tree structure. If you're interested, click the link
below to watch the video.

Source:

[Douglas Crockford: "Theory of the DOM" (1 of 3)](http://goo.gl/KVh23)
