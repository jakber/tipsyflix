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

	  	$.getJSON("http://localhost:3000/game", {}, function(data){
			view.games = data;	
			container.html(view.render().el); 
	  	});

	  },
	  enterName: function(gameId) {
	  	console.log("gameId: " + gameId);
	    var enterNameView = new EnterNameView();
	    enterNameView.gameId = gameId;
	  	container.html(enterNameView.render().el); 

	  },
	  game: function(gameId, name) {

	    console.log("gameId: " + gameId);
	    var gameView = new GameView();
	    gameView.gameId = gameId;
	    gameView.name = name;

		$.getJSON("http://localhost:3000/game/"+gameId+"/button", {}, function(data){
			console.log("got buttons " + data);
			gameView.buttons = data;	
			container.html(gameView.render().el);
	  	});
	  },
	  editGame: function(gameId, name) {
	    
	    console.log("gameId: " + gameId);
	    var editGameView = new EditGameView();
	    editGameView.gameId = gameId;
	    editGameView.name = name;

		$.getJSON("http://localhost:3000/game/"+gameId+"/button", {}, function(data){
			console.log("got buttons");
			editGameView.buttons = data;	
			container.html(editGameView.render().el);
	  	});

	  },
	  scoreboard: function(gameId, name) {
	    console.log("scorebooard for : " + gameId);
	    var scoreboardView = new ScoreboardView();
	    scoreboardView.gameId = gameId;
		$.getJSON("http://localhost:3000/game/"+gameId, {}, function(data){
			console.log("got scores");
			scoreboardView.scores = data;	
			container.html(scoreboardView.render().el);
	  	});

	  },

  });

  return MainRouter;
});

