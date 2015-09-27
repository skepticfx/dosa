var UglifyJS = require('uglify-js');

var instrument = function(code){
  var ast = UglifyJS.parse(code);

  var Transformer = new UglifyJS.TreeTransformer(null, function(node){
    // console.log(node.TYPE);

    if(node.TYPE === 'Call'){
      return createCallNode('box_call', node);
    }

    if(node.TYPE === 'Sub'){
      return createAccessorNode(node);
    }

    if(node.TYPE === 'Binary'){
      return createBinaryNode(node.left, node.right, node.operator);
    }

    if(node.TYPE === 'String'){
      return createCallNode('box_string', node);
    }

  });

  var createBinaryNode = function(left, right, operator){
    return new UglifyJS.AST_Call({
      expression: createSymbolNode('box_binary'),
      args: [left, right, new createStringNode(operator)]
    });
  };

  var createAccessorNode = function(node){
    return new UglifyJS.AST_Call({
      expression: createSymbolNode('box_accessor'),
      args: [node.expression, node.property]
    });
  };

  var createCallNode = function(name, node){
    return new UglifyJS.AST_Call({
      expression: createSymbolNode(name),
      args: [node]
    });
  };

  var createSymbolNode = function(name){
    return new UglifyJS.AST_SymbolRef({
      name: name
    });
  };

  var createStringNode = function(name){
    return new UglifyJS.AST_String({
      value: name
    });
  };

  return ast.transform(Transformer).print_to_string({ beautify: true });

};


exports.instrument = instrument;
