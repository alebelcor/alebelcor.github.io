title: How many global variables are there?
date: 2011-05-19 12:00:00
tags:
- JavaScript
---

We all know global variables in JavaScript are bad.

<!--more-->

If you declare a bunch of variables/functions in the global namespace they
become properties of the global object, in the browser that would be the `window`
object.

So the other day I was thinking of a way to find out how many of them were in a
page. So I came up with this script that you can run to find out:

{% gist 1919146 %}

You can paste that in your console and a list of the globals will show up at the
end of the page.

The names that start with `@` mean they are properties inherited from the
prototype chain.
