define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.home({value:"home"}));
      return this;
    }
  });

  return GameView;
});
