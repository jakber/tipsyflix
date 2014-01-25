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
      this.$el.html(Handlebars.templates.leaderboard({value:"game", "scores":this.scores}));
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
