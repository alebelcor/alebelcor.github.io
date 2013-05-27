title: How to detect a JavaScript array
date: 2011-07-21 11:30:00
tags:
- JavaScript
---

"Piece of cake" I bet you're thinking, oh I wish it were that easy.

<!--more-->

But fear not, JavaScript does have the `typeof` operator (returns a string) which
is very useful for type-checking:

```javascript
var str  = 'hello',
    num  = 64,
    bool = false,
    func = function () {},
    undef;

typeof str;   // "string"
typeof num;   // "number"
typeof bool;  // "boolean"
typeof func;  // "function"
typeof undef; // "undefined"
```

Like shown in the previous code, it works fine for most things. However, it's a little flawed:


```javascript
var n   = null,
    str = new String('hello'), // any wrapper function or custom constructor
    arr = [1, 2, 3];

typeof n;   // "object", which is wrong
typeof str; // "object", which is correct but not very useful.
typeof arr; // "object", which is correct but not very useful.
```


`constructor` property
----------------------

Every created object has a `constructor` property that points to the function
that created the object's prototype. You can leverage that reference to do some
accurate detections:


```javascript
var str    = new String('hello'),
    arr    = [1, 2, 3],
    Person = function (name) {
        this.name = name;
    },
    obj;

obj = new Person('John');

obj.constructor === Person; // true
str.constructor === String; // true
arr.constructor === Array;  // true
```


`isArray` method
----------------

ECMAScript 5 defines a new method for the `Array` function called `isArray`.
If it's not implemented by the browser you can define it like this:

```javascript
if (!Array.hasOwnProperty('isArray')) {
    Array.isArray = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };
}
```

Invoking the `toString` method of `Object`, gets us a string representation of
the object, for arrays it's `[object Array]`:

```javascript
var arr1 = [1, 2, 3],
    arr2 = new Array(1, 2, 3);

Array.isArray(arr1);             // true
Array.isArray(arr2);             // true
Array.isArray(new Number('12')); // false
Array.isArray({});               // false
```

Sources:

[typeof operator (MDC)](http://goo.gl/qGNiS)

[constructor property (MDC)](http://goo.gl/oOmxS)
