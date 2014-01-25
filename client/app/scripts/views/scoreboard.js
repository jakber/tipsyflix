define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.leaderboard({value:"game"}));
      return this;
    }
  });

  return GameView;
});
