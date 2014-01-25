define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.leaderboard({value:"game", "scores":this.scores}));
      return this;
    }
  });

  return GameView;
});
