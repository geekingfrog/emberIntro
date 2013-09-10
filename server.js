var express = require('express');
var _ = require('lodash');
// var path = require('path');

var server = express();

var createItem = function() {
  var id = 0;
  return function(name, description) {
    return {
      id: id++,
      name: name,
      description: description
    };
  }
}();

var cakes = [ createItem('Cupcake', 'Small and good'),
  createItem('Cheescake', 'Popular except in France'),
  createItem('Macaron', 'Sophisticated desert'),
  createItem('Brownie', "You can't go wrong with this one"),
  createItem('Waffle', "Belgium's best invention")
];

server.get('/cakes', function(req, res) { res.send(cakes); });
server.get('/cakes/:id', function(req, res) {
  var id;
  try {
    id = parseInt(req.param('id'), 10);
  } catch(err) {
    return res.send(404, "no item found for id: "+req.param('id'));
  }
  var found = _.find(cakes, function(item) {
    return item.id === parseInt(req.param('id'));
  });
  if(found) { res.send(found); }
  else { res.send(204); }
});

server.use(express.directory(__dirname));
server.use(express.static(__dirname));

server.listen(8000);
