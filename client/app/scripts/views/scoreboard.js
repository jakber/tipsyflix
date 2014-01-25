define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.test({value:"scoreboard"}));
      return this;
    }
  });

  return GameView;
});
