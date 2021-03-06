dank-fileEmitter
-------------

Walk a directory and emit events for each object encountered.


install
-------

```bash
npm install dank-fileemitter
```

api
---

fileEmitter(path, options);

* _path_ - the path from which to emit files/directories/etc.
* _options_ - An object of options
  * _recursive_ - emit objects from sub directories when encountered; default is false
  * _followLinks_ - follow symbolic links when encountered; default is false

events
------

* link
* file
* directory
* blockDevice
* characterDevice
* fifo
* socket
* end

example
-------

```javascript
var fileEmitter = require('dank-fileemitter');

var f = fileEmitter('./',{ recursive : true, followLinks : true });

f.on('file', function (stat) {
	console.log(stat);
});

f.on('directory', function (stat) {
	console.log(stat);
});

f.on('end', function (stat) {
	console.log('all done');
});
```

stat
----

The stat object has additional properties of `path` and `name`; for example:

```javascript
{ dev: 2052,
  mode: 33188,
  nlink: 1,
  uid: 1000,
  gid: 1000,
  rdev: 0,
  blksize: 4096,
  ino: 575051,
  size: 2086,
  blocks: 8,
  atime: Fri Oct 05 2012 17:48:49 GMT-0400 (EDT),
  mtime: Fri Oct 05 2012 17:46:03 GMT-0400 (EDT),
  ctime: Fri Oct 05 2012 17:48:49 GMT-0400 (EDT),
  path: '/tmp/node_modules/dank-fileemitter/README.md',
  name: 'README.md'
```

similar work
---------------

@soldair's [node-walkdir](https://github.com/soldair/node-walkdir)

license
-------

### The MIT License (MIT)


Copyright (c) 2012 Daniel L. VerWeire

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
