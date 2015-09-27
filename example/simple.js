var dosa = require('../index.js');
var input = "var a = location.hash.split('#')[1]";
var output = dosa.instrument(input);
console.log(output);