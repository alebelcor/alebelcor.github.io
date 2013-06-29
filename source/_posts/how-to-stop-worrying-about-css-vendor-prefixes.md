title: How to stop worrying about CSS vendor prefixes
date: 2013-06-28 22:15:00
tags:
- CSS
- Tools
---

There are a lot of ways to start using vendor-prefixed CSS features.

<!--more-->

## The Good

You could:

* Write them by hand using referring to something like
[CSS3 Please!](http://css3please.com/)
or the [Can I use](http://caniuse.com/) site.
* Use [Prefixr](http://prefixr.com/), which will do it for you.
* Use [Prefix free](http://leaverou.github.io/prefixfree), which will also do it
for you but client-side.
* Use [Sass](http://sass-lang.com/) mixins or [Compass](http://compass-style.org/).

The important thing is that we have alternatives. Some are more powerful
and take less time than others, but in the end they all accomplish the same
by making our lives easier.

If you use any of the above methods I think it's safe to say that you may have
already stopped worrying about vendor prefixes. And it's great. But...

## The Bad?

Sometimes, however, that may not be enough.

Here are a couple of thoughts of my own about dealing with prefixes:

* Writing them by hand is, IMHO, tedious and error-prone. And so is having to
check the Can I Use site everytime to get them right.
* Say, Firefox required a prefix for transitions up until version 15 and it still
requires one for using Hyphenation. If I wanted to use both features and have
only the latter one prefixed I wouldn't be able to do it with Compass or Prefixr
as they are an all-or-nothing solution, i.e. either you prefix all
properties/values or you don't, you don't get to choose.
* The Compass project iterates much slower than browsers nowadays so most of the
times I end up creating my own mixins to output the correct prefixes.
* And even when you have custom mixins, it means you'll need to update them
if a prefix is now required or one isn't anymore.
* Finally, the Prefix free client-side approach is not appealing to me. I'd
rather have all my CSS compiled, compressed and ready to be deployed with no
other side effects after the page is loaded.

## The Awesome
Enter [Autoprefixer](https://github.com/ai/autoprefixer), a tool that parses CSS
and adds prefixed values when necessary according to the Can I Use site.

### Why it's awesome

You can specify browser support via a configuration which can be done in
different ways:

* Set support to specific browsers:  `['ie 8', 'ie 7']`
* Set support to only browsers that have certain market share: `['> 5%']`
* Set support to the last `n` versions of browsers: `['latest 2 versions']`

You can use it with Ruby as a gem, as a Node.js package, as a standalone
JavaScript library, as a [Rework](https://github.com/visionmedia/rework) plugin
or, and this one is my favorite, with Grunt via the
[grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) plugin.

## Demo

Let's actually create an example of what I'm talking about.

For this I'll assume you have Node.js installed, that you know how to setup a
project with Grunt and that you've used the `grunt-contrib-watch` plugin.

First, go into your project folder and install the `grunt-autoprefixer`
plugin:

```bash
npm install --save-dev grunt-autoprefixr
```

Supposing we have a `style.css` as:

```css
.test {
    display: flex;
}
```

Notice there are no signs of a vendor prefix anywhere, just
the standard property and value.

Let's now create our `Gruntfile.js` so that it watches over
the changes that we make to our `style.css` file:

```javascript
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    'style.css': 'style.css'
                }
            }
        },

        watch: {
            styles: {
                files: ['style.css'],
                tasks: ['autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
```

Check out the `grunt-autoprefixer` plugin
[repo](https://github.com/nDmitry/grunt-autoprefixer#the-autoprefixer-task)
for further detail on the configuration.

But we're basically saying: "prefix considering only the last two versions of
all major browsers".

Let's trigger a change so the `grunt-contrib-watch` plugin comes
into action and executes the `autoprefix` task.

The `style.css` file should now be:

```css
.test {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
```

Which corresponds to, as of today, for flexbox:

* IE10 requiring the `-ms` prefix. IE9 not supporting the feature.
* Firefox 22 not requiring a prefix. Firefox 21 requiring the
`-moz` prefix.
* Safari 6.0 requiring the `-webkit` prefix. Safari 5.1 also
requiring it.
* Opera 12.1 not requiring a prefix. Opera 12 not supporting the
feature.

Now, let's try a different configuration and declare support only
for the latest version. Change line 7 of the `Gruntfile.js` to:

```javascript
browsers: ['last 1 version']
```

We'll have to stop Grunt, re-run it and trigger a change.

The output this time will be:

```css
.test {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
```

The only change between the two would be that there is no longer
a `-moz` prefix because, as I stated before, Firefox 22 doesn't
require it.

## Closing thoughts

Autoprefixr is configurable in a way that suits many needs. If I want to support
the latest two versions of browsers and also IE9 (and IE8) I can.

It can integrate with Node.js and there's a Grunt plugin for it which makes it
even easier to include in your build or development workflow.

But I think the absolute best would have to be that, because it uses Can I Use,
it adapts to how the Web and Web Browsers progress automatically and effortlessly.
