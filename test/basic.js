var dosa = require('../index.js');
var assert = require('assert');

describe('simple instrumentation', function(){

  it('string', function(){
    assert.equal('var a = box_string("some string");', dosa.instrument('var a = "some string";'));
  });

  it('function calls', function(){
    assert.equal('var a = box_call(b());', dosa.instrument('var a = b();'));
  });

  it('accessor', function(){
    assert.equal('var a = box_accessor(b, 1);', dosa.instrument('var a = b[1];'));
  });

  it('binary', function(){
    assert.equal('var a = box_binary(b, c, "+");', dosa.instrument('var a = b + c;'));
  });

});