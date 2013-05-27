title: CSS Selectors
date: 2011-09-11 02:31:00
tags:
- CSS
---

Have you ever wondered:

* How many selectors does CSS have?
* Which selectors come from which version of CSS?
* How does each selector work?

Me too! so here's what I found out with an example for each one.

<!--more-->

CSS 1
-----

`E` &rarr; an element of type E

```css
div

/* selects any div element in the document */
```

`E F` &rarr; an F element descendant of an E element

```css
div p

/* selects any p element that is a descendant of a div element */
```

`E.warning` &rarr; an E element whose class is "warning"

```css
.banner

/* selects any element whose class is "banner" */
```

`E#myid` &rarr; an E element with ID equal to "myid".

```css
#footer

/* selects an element with ID equal to "footer" */
```

`E:link` &rarr; an E element being the source anchor of a hyperlink of which the
target is not yet visited

```css
a:link

/* selects any unvisited a element */
```

`E:visited` &rarr; an E element being the source anchor of a hyperlink of which
the target is already visited

```css
a:visited

/* selects any visited a element */
```

`E:active` &rarr; an E element currently being selected

```css
a:active

/* selects any a element currently being selected */
```

`E:first-line` &rarr; the first formatted line of an E element

```css
p:first-line

/* selects the first formatted line of any p element */
```

`E:first-letter` &rarr; the first formatted letter of an E element

```css
p:first-letter

/* selects the first formatted letter for any p element */
```

`E, F` &rarr; an element of type E and an element of type F

```css
label, span

/* not really a selector, it's a way of grouping them */
```

According to the CSS 1 spec: "Anchor pseudo-classes have no effect on elements
other than 'A'".

Also, CSS 1 and CSS 2.1 use a single colon to refer to the first-line
pseudo-class (:first-line) but CSS 3 uses two colons (::first-line).


CSS 2.1
-------

Includes all previous ones and adds these in:

`*` &rarr; any element

```css
*

/* selects any element */
```

`E > F` &rarr; an F element child of an E element

```csss
div &gt; p

/* selects any p elements that are direct children of a div element */
```

`E:first-child` &rarr; an E element, first child of its parent

```css
p:first-child

/* selects a p element, the first child of its parent */
```

`E:hover` &rarr; an E element when it's hovered over

```css
a:hover

/* selects any a element when it's hovered over */
```

`E:focus` &rarr; an E element while it has the focus

```css
input:focus

/* selects any input element while it has the focus */
```

`E:lang(fr)` &rarr; an element of type E in language "fr"

```css
*:lang(fr)

/* selects any element which language matches french*/
```

`E[foo]` &rarr; an E element with a "foo" attribute

```css
img[title]

/* selects any img element with a title attribute */
```

`E + F` &rarr; an F element immediately preceded by an E element

```css
div + span

/* selects any span element immediately preceded by a sibling div element */
```

`E[foo="bar"]` &rarr; an E element whose "foo" attribute value is exactly equal
to "bar"

```css
p[class="example"]

/* selects any p element whose class attribute is exactly equal to "example" */
```

`E[foo~="bar"]` &rarr; an E element whose "foo" attribute value is a list of
whitespace-separated values, one of which is exactly equal to "bar"

```css
a[title~="copyright"]

/*
 * selects any a element whose title attribute value is a list of
 * whitespace-separated values, one of which is exactly equal to "copyright"
 */
```

`E[foo|="en"]` &rarr; an E element whose "foo" attribute has a hyphen-separated
list of values beginning (from the left) with "en"

```css
*[lang|="en"]

/*
 * selects any element whose lang attribute has a hyphen-separated list of
 * values beginning (from the left) with "en"
 */
```

CSS 3
-----

Includes all previous ones and adds these in:

`E[foo^="bar"]` &rarr; an E element whose "foo" attribute value begins exactly
with the string "bar"

```css
object[type^="image/"]

/* selects any object element whose type attribute value begins with "image/" */
```

`E[foo$="bar"]` &rarr; an E element whose "foo" attribute value ends exactly
with the string "bar"

```css
a[href$=".html"]

/* selects any a element whose href attribute value ends with ".html" */
```

`E[foo*="bar"]` &rarr; an E element whose "foo" attribute value contains the
substring "bar"

```css
p[title*="hello"]

/*
 * selects any p element whose title attribute value contains
 * the substring "hello"
 */
```

`E:root` &rarr; an E element, root of the document

```css
:root

/* selects the root of the document, i.e. the HTML element */
```

`E:nth-child(n)` &rarr; an E element, the n-th child of its parent

```css
tr:nth-child(0n+3)

/* selects any tr element that is the third child of its parent */
```

`E:nth-last-child(n)` &rarr; an E element, the n-th child of its parent,
counting from the last one

```css
tr:nth-last-child(-n+2)

/* selects any tr element that is one of the two last rows of an HTML table */
```

`E:nth-of-type(n)` &rarr; an E element, the n-th sibling of its type

```css
p:nth-of-type(odd)

/* selects any p element with odd position */
```

`E:nth-last-of-type(n)` &rarr; an E element, the n-th sibling of its type,
counting from the last one

```css
p:nth-of-type(even)

/* selects any p element with even position, starting from the last */
```

`E:last-child` &rarr; an E element, last child of its parent

```css
ol &gt; li:last-child

/* selects any li element which is a last child of an ol element */
```

`E:first-of-type` &rarr; an E element, first sibling of its type

```css
dt:first-of-type

/* selects any dt element that is the first sibling of its type */
```

`E:last-of-type` &rarr; an E element, last sibling of its type

```css
td:last-of-type

/* selects any td element that is the last sibling of its type */
```

`E:only-child` &rarr; an E element, only child of its parent

```css
tr:only-child

/* selects any tr element that is an only child */
```

`E:only-of-type` &rarr; an E element, only sibling of its type

```css
p:only-of-type

/* selects any p element which is the only of its type in a parent */
```

`E:empty` &rarr; an E element that has no children (including text nodes)

```css
div:empty

/* selects any empty div element */
```

`E:target` &rarr; an E element being the target of the referring URI

```css
p:target

/* selects any p element that is the target element of the referring URI */
```

`E:enabled` &rarr; a user interface element E which is enabled

```css
input:enabled

/* selects any input element that is in a enabled state */
```

`E:disabled` &rarr; a user interface element E which is disabled

```css
input:disabled

/* selects any input element that is in a disabled state */
```

`E:checked` &rarr; a user interface element E which is checked

```css
input:checked

/* selects any input element that is selected or is toggled "on" */
```

`E:not(s)` &rarr; an E element that does not match simple selector s

```css
button:not([disabled])

/* selects all button elements that are not disabled*/
```

`E ~ F` &rarr; an F element preceded by an E element

```css
div ~ p

/* selects any p element that is a sibling to any div element */
```

Sources:

[Cascading Style Sheets, level 1](http://goo.gl/ENpHk)

[Cascading Style Sheets Level 2 Revision 1 (CSS 2.1)](http://goo.gl/vNZaZ)

[Selectors Level 3](http://goo.gl/iPoQ7)
