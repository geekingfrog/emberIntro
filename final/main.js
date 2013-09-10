window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource("cakes", function() {
    this.resource("cake", { path: ':cake_id' });
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('chart').set('model', []);
  }
});

App.CakesRoute = Ember.Route.extend({
  model: function() { return App.Cake.findAll(); }
});

App.CakeRoute = Ember.Route.extend({
  model: function(param) {
    return App.Cake.findOne(param.cake_id);
  }
});

App.CakesController = Ember.ArrayController.extend();

App.CakeController = Ember.ObjectController.extend({
  needs: "chart",
  chart: Ember.computed.alias("controllers.chart"),
  actions: {
    orderCake: function() {
      var cake = this.get("content");
      this.get("chart.content").pushObject(cake);
      // this.get("controllers.chart.content").addObject(this.get("content"));
    }
  }
});

App.ChartController = Ember.ArrayController.extend({
  totalPrice: function() {
    return this.get("content").reduce(function(acc, cake) {
      return acc+cake.price;
    }, 0);
  }.property('content.@each.price')
});

Ember.Handlebars.registerBoundHelper('price', function(val) {
  return val+" nt";
});

/*
 * Models from here
 */

App.Cake = Ember.Object.extend();

App.Cake.reopenClass({
  findAll: function() { return $.getJSON('/cakes'); },
  findOne: function(id) { return $.getJSON('/cakes/'+id); }

});
