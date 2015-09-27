# dosa
A Javascript transpiler for instrumentation

## Install
``npm install dosa``


## Usage
```javascript
var dosa = require('dosa');
var input = "var a = location.hash.split('#')[1]";
var output = dosa.instrument(input);
console.log(output);
// var a = box_accessor(box_call(location.hash.split(box_string("#"))), 1);
```


## Instrumentation

This is how the code will be instrumented

#### Function calls
  `alert(1)` becomes`box_call(alert())`

#### Property accessors
  `a+1` becomes `box_accessor(a, 1)`

#### Binary operations
  `a+b` becomes `box_binary(a, b, "+")`

#### String
  `"some string"` becomes `box_string("some string")`

## Credits

I found the [UglifyJS](https://github.com/mishoo/UglifyJS2) project's [AST structure](https://github.com/skepticfx/uglify-ast/blob/master/spec.md) to be very expressive and made writing this transpiler easier for me.
