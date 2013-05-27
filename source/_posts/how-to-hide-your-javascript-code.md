title: How to hide your JavaScript code
date: 2011-05-26 12:00:00
tags:
- JavaScript
---

Billy Hoffman, xo-author of "Ajax Security", has a very interesting talk about
JavaScript named "The Evil Parts" where he talks about the "evil" things a person
can accomplish using JavaScript.

<!--more-->

One of the things he shows us are two functions, a dehydrate and a hydrate function.
He uses them to hide/display malicious code, to "dehydrate" JavaScript, so the
code is transformed into whitespace and tabs, therefore becoming invisible.

```javascript
// to "dehydrate" a string of code
function dehydrate(s) {
    var r = new Array();
    for (var i = 0; i < s.length; i++) {
        for (var j = 6; j >= 0; j--) {
            if (s.charCodeAt(i) & (Math.pow(2, j))) {
                r.push(' ');
            } else {
                r.push('\t');
            }
        }
    }
    r.push('\n');
    return r.join('');
}

// to "hydrate" a string of code
function hydrate(s) {
    var r = []; var curr = 0;
    while (s.charAt(curr) != '\n') {
        var tmp = 0;
        for (var i = 6; i >= 0; i--) {
            if (s.charAt(curr) == ' ') {
                tmp = tmp | (Math.pow(2, i));
            }
            curr++;
        }
        r.push(String.fromCharCode(tmp));
    }
    return r.join('');
}
```

So you dehydrate the code to hide it. And you hydrate it back and then eval it
to execute it.

The code does become larger (x7 according to him) because it goes character by
character transforming them, but hey, it's invisible code!

Give it a try, you know you want to.

Source:

[Billy Hoffman - JavaScript: The Evil Parts](http://goo.gl/3wfYi)
