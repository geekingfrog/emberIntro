var express = require('express');
var _ = require('lodash');
// var path = require('path');

var server = express();

var createItem = function() {
  var id = 0;
  return function(name, description, price, img) {
    return {
      id: id++,
      name: name,
      description: description,
      price: price,
      img_url: img
    };
  }
}();

var cakes = [ createItem('Cupcake', 'Small and good', 100, '/img/cupcake.jpg'),
  createItem('Cheesecake', 'Popular except in France', 120, '/img/cheesecake.jpg'),
  createItem('Macaron', 'Sophisticated desert', 300, '/img/macaron.jpg'),
  createItem('Brownie', "You can't go wrong with this one", 75, '/img/brownie.jpg'),
  createItem('Waffle', "Belgium's best invention", 80, '/img/waffle.jpg')
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
console.log("Server up and listening on port 8000");
