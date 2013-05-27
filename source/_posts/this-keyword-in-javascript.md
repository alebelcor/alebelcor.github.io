title: The this keyword in JavaScript
date: 2011-07-09 16:57:00
tags:
- JavaScript
---

What does `this` mean?
----------------------

Short answer, it depends.

<!--more-->

In general terms, you could say that the `this` keyword, in JavaScript, refers to
the function's context, how it's invoked. There are four ways in which a function
can be invoked: method form, function form, constructor form and apply form.


Method form
-----------

If a function is invoked in the method form, `this` will be bound to the object
that owns the function:

```javascript
var myObj = {
    name   : 'Chuck',
    sayName: function () {
        return 'Hello ' + this.name;
    }
};

myObj.sayName(); // `this` refers to myObj, returns 'Hello Chuck'
```


Function form
-------------

This means taking a function value and calling it. In ECMAScript 3, `this` would
be bound to the global object:

```javascript
var myFunc = function () {
    return this.location.href;
};

myFunc(); // `this` refers to window (in browsers), returns the current URL
```

In ECMAScript 5 Strict Mode ([almost fully supported](http://goo.gl/0V8Ef)), `this`
was changed so that it would refer to `undefined` instead:

```javascript
var myFunc = function () {
    'use strict';
    return this.location.href;
};

myFunc(); // error, `this` is undefined
```


Constructor form
----------------

A constructor function is meant to be called using the `new` keyword, in this
form, `this` will refer to the object being produced:


```javascript
var MyConstructor = function (name) {
    this.name    = name;
    this.sayName = function () {
        return 'Hello ' + this.name;
    };
};

var myObj = new MyConstructor('Chuck');

myObj.name;      // 'Chuck'
myObj.sayName(); // 'Hello Chuck'
```


Apply form
----------

Functions are objects and, as most objects, they have methods. This form refers
to using the function's methods `apply` or `call` to call a function. Both
methods take whatever first argument you pass and bound `this` to it. They differ
in the way they provide the arguments to the function being invoked.

The `apply` method takes an array of arguments:

```javascript
var myObj1 = {
    name: 'Chuck'
};

var myObj2 = {
    name: 'Charles'
};

var sayWelcome = function (location) {
    return 'Hello ' + this.name + '. Welcome to ' + location;
};

sayWelcome.apply(myObj1, ['New York']); // 'Hello Chuck. Welcome to New York'
sayWelcome.apply(myObj2, ['Toronto']);  // 'Hello Charles. Welcome to Toronto'
```

The `call` method takes a list of arguments separated by commas:

```javascript
sayWelcome.call(myObj1, 'New York'); // 'Hello Chuck. Welcome to New York'
sayWelcome.call(myObj2, 'Toronto');  // 'Hello Charles. Welcome to Toronto'
```

Summary
-------

The value of `this` depends on the calling form:

* Method form: it's bound to the object containing the method.
* Function form: it's bound to either the global object (ECMAScript 3), or to
`undefined` in (ECMAScript 5 Strict Mode).
* Constructor form: it's bound to the new object being constructed.
* Apply form: it's bound to the first argument passed to `apply` or `call`.

Source:

[Crockford on JavaScript - Act III: Function the Ultimate](http://goo.gl/s9vkC)
