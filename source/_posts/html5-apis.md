title: HTML5 APIs
date: 2011-10-08 18:21:00
tags:
- HTML5
- JavaScript
---

HTML5 introduces lots of new and exciting things for web authors, among these are new APIs.
Here are some of them.


### [Application Cache API](http://dev.w3.org/html5/spec-author-view/spec.html#application-cache-api)

An API to interact with the application cache, which is a set of cached resources.

You can do `window.applicationCache` to get the `ApplicationCache` object that applies to
the active document of that window. More on application caches
[here](http://dev.w3.org/html5/spec/offline.html#appcache).


### [DataTransfer API](http://dev.w3.org/html5/spec-author-view/spec.html#datatransfer)

The `DataTransfer` objects are used to expose the drag data store that underlies a
drag-and-drop operation. More on drag and drop
[here](http://dev.w3.org/html5/spec-author-view/spec.html#dnd).


### [Command API](http://dev.w3.org/html5/spec-author-view/spec.html#command-api)

A command is the abstraction behind menu items, buttons, and links. They are defined
to have facets (label, hint, icon, etc.) and are exposed on elements using this API.


### [Constraint Validation API](http://dev.w3.org/html5/spec-author-view/spec.html#the-constraint-validation-api)

As of this writing, there is no proper definition to this. But we can assume it'll
extend our client-side validation tool arsenal.


### [History API](http://dev.w3.org/html5/spec-author-view/spec.html#history-0)

The `History` objects provide a representation of the pages in the session history
of browsing contexts.

For example, you can go back (`window.history.back`) and forward (`window.history.forward`).
More on session history [here](http://dev.w3.org/html5/spec-author-view/spec.html#history).


### [MediaController API](http://dev.w3.org/html5/spec-author-view/spec.html#media-controllers)

An API to interact with the `<audio>` and `<video>` elements.

You can do things like play (`controller.play`) and pause (`controller.pause`).
More on media elements
[here](http://dev.w3.org/html5/spec-author-view/spec.html#media-element).


### [Text Track API](http://dev.w3.org/html5/spec-author-view/spec.html#text-track-api)

An API to interact with the `<audio>` and `<video>` associated text tracks,
like subtitles or captions.

You can get a `media` element and get a track from it like `media.textTracks[0]`
(for the first one).

A `textTrack` element has it's own API which can return things like the language,
readyState, mode, etc. More on media elements
[here](http://dev.w3.org/html5/spec-author-view/spec.html#media-element).


### [APIs for the text field selections](http://dev.w3.org/html5/spec-author-view/spec.html#textFieldSelection)
The `input` and `textarea` text elements define an API for handling their selection.

You can select everything in a text field with the `select` function, or use
`selectionStart` and `selectionEnd` to get the currently selected text.

By the way, this is not it. There are, of course, other interfaces and current
elements that are being extended with new properties and functions.


Related specifications
----------------------

Now I present to you:

* Specs that were originally in the HTML5 spec, but were later moved out into their own.
* Specs worked on by the Web Apps Working Group (in charge of HTML5).
* Other related/interesting specs.

### [Canvas 2D Context](http://dev.w3.org/html5/2dcontext)

Defines the 2D Context for the HTML `<canvas>` element.


### [Clipboard API and events](http://dev.w3.org/2006/webapi/clipops/clipops.html)

Describes APIs for clipboard operations such as copy, cut and paste in web applications.


### [Editing APIs](http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html)

Defines commands to edit HTML documents programmatically.


### [File API](http://dev.w3.org/2006/webapi/FileAPI)

This specification provides an API for representing file objects in web applications,
as well as programmatically selecting them and accessing their data.


### [File API: Directories and System](http://dev.w3.org/2009/dap/file-system/file-dir-sys.html)

This specification defines an API to navigate file system hierarchies.


### [File API: Writer](http://dev.w3.org/2009/dap/file-system/file-writer.html)

This specification defines an API for writing to files from web applications.


### [HTML5 Web Messaging](http://dev.w3.org/html5/postmsg)

Defines two mechanisms for communicating between browsing contexts in HTML documents.


### [Indexed Database API](http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html)

Formerly WebSimpleDB API, this document defines APIs for a database of records
holding simple values and hierarchical objects.


### [Server-Sent Events](http://dev.w3.org/html5/eventsource)

This specification defines an API for opening an HTTP connection for receiving
push notifications from a server in the form of DOM events.


### [The Web Sockets API](http://dev.w3.org/html5/websockets)

This specification defines an API that enables Web pages to use the WebSocket
protocol for two-way communication with a remote host.


### [Web Storage](http://dev.w3.org/html5/webstorage)

This specification defines an API for persistent data storage of key-value pair
data in Web clients.


### [Web Workers](http://dev.w3.org/html5/workers)

This specification defines an API that allows Web application authors to spawn
background workers running scripts in parallel to their main page. This allows
for thread-like operation with message-passing as the coordination mechanism.


### [XMLHttpRequest Level 2](http://dev.w3.org/2006/webapi/XMLHttpRequest-2)

Enhances the `XMLHttpRequest` object with new features, such as cross-origin
requests, progress events, and the handling of byte streams for both sending and
receiving.


And, again, these are not it. There are other working groups in the W3C besides
the Web Apps one, each one with specifications they're working on. It's crazy,
I know, but hopefully this will give you an idea of what's coming. I strongly
recommend you to research more about it and experiment.

Sources:

[HTML5: Edition for Web Authors (editor's draft)](http://goo.gl/lxtGi)

[WebApps Working Group Publication Status of specifications](http://goo.gl/VGjgi)
