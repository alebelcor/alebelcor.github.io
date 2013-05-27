title: jQuery.type
date: 2011-08-12 22:01:00
tags:
- JavaScript
- jQuery
---

In my last post I wrote about how to detect a JavaScript array, so I thought it
would be a good idea to see how jQuery does it.

Here's the `jQuery.isArray` method (in 1.6.2):

```javascript
isArray: Array.isArray || function( obj ) {
    return jQuery.type(obj) === "array";
}
```

It uses the native `Array.isArray` method if it exists, if not it will find out
the type of whatever is passed in using the `jQuery.type` method and see if that
equals the string `"array"`.

But come on, that's not much of a learning experience not to mention it makes for
a pretty short blog post.

So instead, I looked into the `jQuery.type` method to see how that works.


`jQuery.type`
-------------

It looks something like this:

```javascript
// Save a reference to some core methods
toString = Object.prototype.toString
...
// [[Class]] -> type pairs
class2type = {};
...
type: function( obj ) {
    return obj == null ?
        String( obj ) :
        class2type[ toString.call(obj) ] || "object";
}
...
// Populate the class2type map
jQuery.each(
    "Boolean Number String Function Array Date RegExp Object".split(" "),
    function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
})
```

(Distant pieces of code are separated with three dots)


Breaking it down
----------------

* Line 3 - A reference to the `toString` method of `Object`.
* Line 6 - An internal object (map) that will contain all types as strings.
* Line 15-19 - For each member in the array we're passing in, we'll create a
property in the object and set its value to the name of the array member in lowercase.
* Line 8-12 - The method will check if the argument passed in is `null` or `undefined`,
if so, it will return the string `"null"` or `"undefined"` (by calling the `String`
constructor without the `new` keyword, which is allowed for some constructors).
If it's something else, we'll call the `toString` method on the argument and look
to see if the `class2type` object has a value for it, if not, we'll just return
the string `"object"`.

To give you a better overall picture, here's how the `class2type` object would
look after page load:

```javascript
var class2type = {
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Function]": "function",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object RegExp]": "regexp",
    "[object String]": "string"
};
```

Epiphany
--------

That's why we call the `toString` method of `Object` when we're looking for the
property name. Remember how this method returns this sort of a `"[object Constructor]"`
string pattern?

So, if we did `jQuery.type("hello")` we'd actually be doing something like
`class2type["[object String]"]`, which would return the corresponding value `"string"`

And that's how the `jQuery.type` method works.

It's not that complicated when you have an "Epiphany" section, huh?

Sources:

[jQuery.type - jQuery API Documentation](http://goo.gl/1T9yK)

[jQuery 1.6.2 Source Code](http://goo.gl/MW8WI)
