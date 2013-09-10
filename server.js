var express = require('express');
var _ = require('lodash');
// var path = require('path');

var server = express();

var createItem = function() {
  var id = 0;
  return function(name, description, price) {
    return {
      id: id++,
      name: name,
      description: description,
      price: price
    };
  }
}();

var cakes = [ createItem('Cupcake', 'Small and good', 100),
  createItem('Cheescake', 'Popular except in France', 120),
  createItem('Macaron', 'Sophisticated desert', 300),
  createItem('Brownie', "You can't go wrong with this one", 75),
  createItem('Waffle', "Belgium's best invention", 80)
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
