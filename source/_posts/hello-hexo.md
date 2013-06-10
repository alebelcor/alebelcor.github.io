title: Hello Hexo
date: 2013-05-26 19:00:45
tags:
- Tools
---

Yesterday I came across an [article](https://news.ycombinator.com/item?id=5766352)
on Hacker News about [Hexo](http://zespia.tw/hexo), a blogging platform for
Node.js ala Jekyll/Octopress.

<!--more-->

It immediately caught my eye because I had a nasty time trying to setup Octopress
the other day. To be fair, it's not its fault, Windows is not a very Ruby-friendly
environment. And they are both somewhat similar.

With both you can:

* Write posts in [Markdown](http://daringfireball.net/projects/markdown/syntax).
* Compile them to static files.
* Theme your blog.
* etc.

And best of all, at least for me, since it's running on Node.js, it is
cross-platform and works on Windows (yay). So I gave it a try.

To create a new post:

```bash
hexo new post "My post title"
```

To generate HTML:

```bash
hexo generate
```

To watch files for changes (and generate):

```bash
hexo generate -w
```

To launch a server to look at the results.

```bash
hexo server
```

Note: Once the server has been launched, it looks like it won't pick up any
changes you do, you'll have to relaunch it. Bummer, I know. But until this is
fixed you can work around it using [Grunt](http://gruntjs.com) and launching your
own server with the
[grunt-contrib-connect plugin](https://github.com/gruntjs/grunt-contrib-connect).

I migrated all my old posts from my blogger site and I have been editing partials
and CSS to make the theme look nicer.

Hopefully it'll get more Octopress plugins migrated and better looking themes.

If you're curious check out the [documentation](http://zespia.tw/hexo/docs/).
