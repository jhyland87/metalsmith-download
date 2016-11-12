## Description
Metalsmith plugin that downloads a file locally 

Forked from **[git@github.com:geek/metalsmith-download.git](https://github.com/geek/metalsmith-download)**


## Installation

```javascript
$ npm install metalsmith-download__tbd__
```

## Usage

### CLI

**Multiple Download**
```javascript
{
  "plugins": {
    "metalsmith-download__tbd__": {
      "url": "http://site.com/file.md",
      "file": "/path/to/save/file.md"
    }
  }
}
```
**Multiple Downloads**
```javascript
{
  "plugins": {
    "metalsmith-download__tbd__": [
      {
      "url": "http://site.com/file-one.md",
      "file": "/path/to/save/file-one.md"
    },
    {
      "url": "http://site.com/file-two.md",
      "file": "/path/to/save/file-two.md"
    }
    ]
  }
}
```

### JavaScript

**Multiple Download**
```javascript
var MetalSmith = require('metalsmith');
var Download = require('metalsmith-download__tbd__');

Metalsmith(__dirname).use(Download({
  url: 'http://site.com/file.md',
  file: '/path/to/save/file.md'
}))
.build();
```

**Multiple Downloads**
```javascript
var MetalSmith = require('metalsmith');
var Download = require('metalsmith-download__tbd__');

Metalsmith(__dirname).use(Download([
  {
      url: 'http://site.com/file-one.md',
      file: '/path/to/save/file-one.md'
    },
    {
      url: 'http://site.com/file-two.md',
      file: '/path/to/save/file-three.md'
    }
]))
 .build();
 ```


## Changes

### Completed Changes
List of what features that have already been created, or modifications to existing methods:

 * Ability to download multiple files by passing an array of objects (with `file` and `url` properties), as opposed to just a single object
 * Asynchronus downloading of multiple files by using the *[Async](https://github.com/caolan/async)* module 

### ToDo

Features I plan on adding very soon:

 * The primary exported function expects an array or object only; This should be modified to allow a string value (the `url`), and defaulting the `file` destination to the build dir.
 * Ability to download multiple items (by passing an array of URL's to the `url` property; Then defining something like `file-%n` for the `file` value - to download each item and save it as a name with an incremented numeric value.
 * Specify multiple `url` values, allowing failover URL's to download the file from.