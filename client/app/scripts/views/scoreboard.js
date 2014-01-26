define(['backbone', 'compiled-templates', 'config'], function(Backbone, Handlebars, config){
  var GameView = Backbone.View.extend({
  	initialize: function(options) {
  		var that = this;
  		$.getJSON(config.server + "/game/"+options.gameId, {}, function(data){
  			console.log("got scores");
  			that.scores = data;	
  			that.render();
	  	});
  	},
    render: function () {
      var scores = (this.scores || {players:[]}).players.sort(function (a,b) {
        return b.wins - a.wins;
      });
      this.$el.html(Handlebars.templates.leaderboard({value:"game", "scores":scores}));
      return this;
    },
    events: {
    	"click button": "onNewGame",
    },
    onNewGame: function(event) {
    	window.appRouter.navigate("", true);
    	event.preventDefault();
    }
  });

  return GameView;
});
