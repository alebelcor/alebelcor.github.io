title: jQuery.parseJSON
date: 2011-04-21 15:30:00
tags:
- JavaScript
- jQuery
---

The other day I was re-watching (haha, learning through repetition) "11 More
Things I Learned from the jQuery Source" and this time I was quite amazed when
Paul Irish talked about `parseJSON`. And the reason was the way jQuery makes the
JSON object, it's clever, it's very clever.

<!--more-->

Let me show you. Here's jQuery's 1.5.2 `parseJSON` method:

```javascript
parseJSON: function( data ) {
    if ( typeof data !== "string" || !data ) {
        return null;
    }

    // Make sure leading/trailing whitespace is removed (IE can't handle it)
    data = jQuery.trim( data );

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if ( rvalidchars.test(data.replace(rvalidescape, "@")
        .replace(rvalidtokens, "]")
        .replace(rvalidbraces, "")) ) {

        // Try to use the native JSON parser first
        return window.JSON && window.JSON.parse ?
            window.JSON.parse( data ) :
            (new Function("return " + data))();

    } else {
        jQuery.error( "Invalid JSON: " + data );
    }
},
```

Let's dissect that:

* Lines 2-4 are just checking you pass a string and its not empty.
* Line 7 explains itself.
* Lines 11-13 is a regular expression evaluation to make sure we have valid JSON.

The interesting part, in this case, is the return statement:

```javascript
return window.JSON && window.JSON.parse ?
    window.JSON.parse( data ) :
    (new Function("return " + data))();
```

If the browser has native JSON support, use that. If not, and this is the
interesting part, we'll do `(new Function("return " + data))()`.

But what does that mean? I'm glad you asked.

* We're calling the `Function` constructor, which will return a `Function`
object (function reference) and immediately invoke it.
* The `Function` constructor takes an "n" number of arguments that will become
the function's parameters, being the last one the body of the function. We're
passing only one parameter, meaning `"return " + data` will become the
function's body.
* What does the constructed function do then? Considering `data` is a JSON
string it becomes rather obvious now. It returns a JavaScript object. See? I
told you it was clever, no need for `eval` this way.

Sources:

[11 More Things I Learned From The jQuery Source](http://goo.gl/NiNm6)

[Function - MDN](http://goo.gl/PfwKh)
