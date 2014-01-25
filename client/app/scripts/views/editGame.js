define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.master_1_button({value:"editGame"}));
      return this;
    }
  });

  return GameView;
});
