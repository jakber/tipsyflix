define(['jquery', 'views/home','views/enterName','views/game','views/editGame','views/scoreboard'], function($, HomeView, EnterNameView, GameView, EditGameView, ScoreboardView){
  var container = $("div.hero-unit");
  var MainRouter = Backbone.Router.extend({
	 routes: {
	    "": "home",    // #help
	    "game/:id": "enterName", 
	    "game/:id/edit": "editGame",  // #search/kiwis
	    "game/:id/:name": "game",  // #search/kiwis
	    "game/:id/:name/scores": "scoreboard"   // #search/kiwis/p7
	  },

	  home: function() { 
	  	var view = new HomeView();
	  	container.html(view.render().el); 
	  },
	  enterName: function(gameId) {
	  	console.log("gameId: " + gameId);
	    var enterNameView = new EnterNameView();
	    enterNameView.gameId = gameId;
	  	container.html(enterNameView.render().el); 

	  },
	  game: function(gameId, name) {
	    console.log("gameId: " + gameId);
	    var gameView = new GameView({gameId:gameId, name:name});
	    container.html(gameView.render().el);
	  },
	  editGame: function(gameId) {
	 	var editGameView = new EditGameView({gameId:gameId});
	    editGameView.gameId = gameId;
	    container.html(editGameView.render().el);

	  },
	  scoreboard: function(gameId, name) {
	    console.log("scoreboard for : " + gameId);
	    var scoreboardView = new ScoreboardView({gameId:gameId});
        container.html(scoreboardView.render().el);
	  },

  });

  return MainRouter;
});

