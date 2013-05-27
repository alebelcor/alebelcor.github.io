title: jQuery.trim
date: 2011-04-28 12:00:00
tags:
- JavaScript
- jQuery
---

Do you want to know how the trim method works in jQuery? Today is lucky day.

Here's the code from the jQuery 1.5.2 source, I separated distant lines of code
with three dots:

```javascript
...
// Check if a string has a non-whitespace character in it
rnotwhite = /\S/,

// Used for trimming whitespace
trimLeft = /^\s+/,
trimRight = /\s+$/,
...
// Save a reference to some core methods
...
trim = String.prototype.trim,
...
// Use native String.trim function wherever possible
trim: trim ?
    function( text ) {
        return text == null ?
            "" :
            trim.call( text );
    } :

    // Otherwise use our own trimming functionality
    function( text ) {
        return text == null ?
            "" :
            text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
    },
...
// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
    trimLeft = /^[\s\xA0]+/;
    trimRight = /[\s\xA0]+$/;
}
...
```

Line 14 is where the ternary action to determine how `jQuery.trim` will behave
begins, all the way through line 26. Another way to look at it is this:

```javascript
trim: trim ?
    function( text ) {
        // native trimming
    } :
    function( text ) {
        // jQuery trimming
    },
```

You might find `trim: trim` hard to understand, but not when you look at the
`trim` variable in line 11. Notice how jQuery stores an internal reference to
the native `trim` method of strings. So, if we have native support for trimming,
i.e. checking for truthy value in the `trim` variable, we go ahead and do it
that way but not before checking for `null` or `undefined`.

If the browser doesn't have support, we'll check if the passed string is not
`null` or `undefined`, if it is, we'll return a blank string (just like in the
first case), otherwise we'll trim it. Let's see how.

We're calling the `toString` method on the passed string to, and this is a total
guess, make sure we have a string to work with before attempting any operation.

Then we'll trim the left side of the string and after that the right side. The
regular expressions for those (in lines 6 & 7) match, pretty much, every type of
space you wouldn't want in your string. So, we make sure that the passed string
doesn't have those, and if it does, we get rid of them by replacing them with a
blank string.

We're just missing lines 2-3 and 28-32. `rnotwhite` matches a single character
other than white space and lines 28-32 check if we should be checking for
non-breaking spaces (`A0` in hexadecimal) in our trimming, mostly because of IE
like the comment says. If so, we need to redefine our `trimLeft` and `trimRight`
to include matching the non-breaking space character.

Sources:

[jQuery 1.5.2 source code](http://goo.gl/ycx2j)

[jQuery API - jQuery.trim](http://goo.gl/kD5JA)
