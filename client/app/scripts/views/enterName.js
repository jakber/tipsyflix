define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.test({value:"enterNaame"}));
      return this;
    }
  });

  return GameView;
});
