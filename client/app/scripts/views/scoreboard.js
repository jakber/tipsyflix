define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
  	initialize: function(options) {
  		var that = this;
  		$.getJSON("http://localhost:3000/game/"+options.gameId, {}, function(data){
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
