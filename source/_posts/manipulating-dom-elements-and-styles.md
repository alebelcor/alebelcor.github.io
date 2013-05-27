title: Manipulating DOM elements and styles
date: 2011-02-28 12:30:00
tags:
- JavaScript
- DOM
---

Manipulating elements
---------------------

Once you have access to an element, you can manipulate it using assignment of
object properties or DOM methods. Let's take a look at the examples:

### HTML

```html
<img src="small-dog.png" id="img-dog">
```

### JavaScript

```javascript
var myImage = document.getElementById('img-dog');

// Object property
myImage.src = 'big-dog.png';

// DOM method
myImage.setAttribute('src', 'big-dog.png');
```

In both examples we're changing the `src` of our image element. It's recommended
to use the first example, it's easier, shorter, faster and works across browsers.
If, for some reason, you can't use it, use the second one.
Here's a link to [quirksmode.org](http://goo.gl/HQo7a) with more information.


Style
-----

You can also change an element's style dynamically . You can do so by changing
the `className` property or applying a style directly into the `style` object.

### HTML

```html
<span id="my-span">Some text here</span>
```

### JavaScript

```javascript
var mySpan = document.getElementById('my-span');

mySpan.className       = 'big';    // the CSS class 'big' makes the text big
mySpan.style.textAlign = 'center'; // centers the text
```

Both, `className` and `style`, are read/write. But, the style object will only
reflect styles that are directly applied to the element (i.e. in the markup),
not the ones from the cascade. To get those you need go a little bit further:


### HTML

```html
<span id="my-span">Some text here</span>
```

### CSS

```css
#my-span {
    font-weight: bold;
}
```

### JavaScript

```javascript
var mySpan = document.getElementById('my-span');

mySpan.style.fontWeight;              // returns an empty string
mySpan.currentStyle['fontWeight'];    // returns 'bold', works only in IE
window.getComputedStyle(mySpan)
    .getPropertyValue('font-weight'); // returns 'bold', doesn't work in IE
```

As you can see:

* The CSS property on the `style` object didn't have anything and returned an
empty string.
* IE's proprietary method is very nice and readable (you could also use the
dot notation, e.g. `mySpan.currentStyle.fontWeight`).
* The standard way is very verbose and complicated but works on all standards
compliant browsers. If you need to get styles individually I suggest creating a
utility function to deal with the cross browser issues (an example from
[quirksmode.org](http://goo.gl/vlIir)).

But in general, I recommend using CSS classes for dynamic styling. It is way
easier and faster to add/modify/delete CSS classes. It's a style agnostic
practice, in case you don't have control over the styles, and also encourages
layer separation.

Source:

[Douglas Crockford: "Theory of the Dom" (2 of 3)](http://goo.gl/XoDym)
