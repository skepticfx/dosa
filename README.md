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

#### func()
  `box_call(func())`

#### a[1]
  `box_accessor(a, 1)`

#### a+b
  `box_binary(a, b, "+")`

#### "str"
  `box_string("str")`

## Credits

I found the [UglifyJS](https://github.com/mishoo/UglifyJS2) project's [AST structure](https://github.com/skepticfx/uglify-ast/blob/master/ast-spec.md) to be very expressive and made writing this transpiler easier for me.