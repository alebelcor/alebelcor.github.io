title: An Introduction to Mocha
date: 2013-06-09 18:50:40
tags:
- JavaScript
- Testing
- Tools
---

What is Mocha?
--------------

[Mocha](http://visionmedia.github.io/mocha/) is a feature-rich JavaScript
test framework running on node and the browser, making asynchronous
testing simple and fun.

If you're interested in writing tests for your JavaScript code, Mocha is
a good way to start.

<!--more-->

Advantages
----------

* Runs on both Node.js and the browser.
* Allows for regular and async testing.
* Allows use of any assertion library you want.
* Tests can be written in a BDD, TDD or other styles.
* Has a variety of test results reporters.
* Built-in file watching support.
* and [more](http://visionmedia.github.io/mocha/#features).


Testing with Mocha
------------------

### Installation ###

First, you need to have Node.js installed (and npm).

To install:

```bash
npm install -g mocha
```

This installs Mocha globally so that you can use the command everywhere.


### How to use ###

```javascript
var assert = require('assert');

describe('String', function () {
    describe('#indexOf', function () {
        it('should return -1 when the substring is not present', function () {
            var myString = 'test';

            assert.equal(-1, myString.indexOf('x'));
            assert.equal(-1, myString.indexOf('y'));
        });
    });
});
```

Let's save the above code as a `test.js` file. We'd run the test like this:

```bash
mocha test.js
```

By default, if you don't specify a file or folder, Mocha will run all tests in
the `test` folder where you're running the command.

Let's leverage that and move the file to a `test` folder. Run:

```bash
mocha
```

And the same output should show up.


### Recursive ###

If you have a folder structure with lots of files and  in your `test` folder you
can run mocha with the `--recursive` option:

```bash
mocha --recursive
```

This will find and run every test file on every folder.


### Reporters ###

Now, our output, although colored, looks kind of weak:

```bash

  .

  ✓ 1 test complete (5 ms)
```

Luckily, Mocha provides several
[reporters](http://visionmedia.github.io/mocha/#reporters) for us to choose how
we'd like our test results output to look like.

My preference is to use the `spec` reporter. We can use it like so:

```bash
mocha -R spec
# or
mocha --reporter spec
```

To which the output now would be:

```bash
  String
    #indexOf
      ✓ should return -1 when the substring is not present


  1 test complete (7 ms)
```

### `mocha.opts` ###

We can save an options file called `mocha.opts` where we can specify
command-line options to pass to Mocha. Say, every time we run our our tests
we'd like it to be recursive, use the spec reporter and exit on the first
failed test:

```bash
---recursive
---reporter spec
---bail
```


### Assertions ###

Mocha doesn't have a built-in assertion system. In fact, if you hadn't noticed,
the test example is using Node.js' `assert`
[module](http://nodejs.org/api/assert.html) because, again, Mocha doesn't have
one.

This can be thought of as both good and bad, but let's try to keep an open mind.

With Mocha we can use any assertion library we want to make our tests.

Here are some options listed on the website:

* [should.js](http://github.com/visionmedia/should.js)
* [expect.js](https://github.com/LearnBoost/expect.js)
* [chai](http://chaijs.com/)
* [better-assert](https://github.com/visionmedia/better-assert)

The one I have experimented with is chai, specifically,
[chai's expect](http://chaijs.com/guide/styles/#expect) assertion.

How would we rewrite the example using chai's expect? Let's first install it:

```bash
npm install chai
```

We'd have to require chai's `expect`.

```javascript
var expect = require('chai').expect;
```

And instead of saying `assert.equal` we would do something like `expect` this
value to be equal to this other value:

```javascript
var expect = require('chai').expect;

describe('String', function () {
    describe('#indexOf', function () {
        it('should return -1 when the substring is not present', function () {
            var myString = 'test';

            expect(myString.indexOf('x')).to.equal(-1);
            expect(myString.indexOf('y')).to.equal(-1);
        });
    });
});
```

The difference is subtle, but significant in readability. If you're not very
fond of this style, chai has two other styles and if you don't like those, try
another library.

## Conclusion ##

I like it, ha. I like it because it has so many options, because it has useful
things already baked in, because it's easy, flexible, pluggable and
configurable.

Go take a look at the docs, I didn't write about a lot of awesome Mocha stuff.

Sources:

* [Mocha](http://visionmedia.github.io/mocha/)
* [Chai](http://chaijs.com/)
