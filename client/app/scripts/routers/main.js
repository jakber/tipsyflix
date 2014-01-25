define(['jquery', 'views/home','views/enterName','views/game','views/editGame','views/scoreboard'], function($, HomeView, EnterNameView, GameView, EditGameView, ScoreboardView){
  var container = $("div.hero-unit");
  var MainRouter = Backbone.Router.extend({
	 routes: {
	    "": "home",    // #help
	    "game/:id": "enterName", 
	    "game/:id/:name": "game",  // #search/kiwis
	    "game/:id/:name/edit": "editGame",  // #search/kiwis
	    "game/:id/:name/scores": "scoreboard"   // #search/kiwis/p7
	  },

	  home: function() { 

	  	var view = new HomeView();

	  	$.getJSON("http://localhost:3000/game", {}, function(data){
			view.games = data;	
			container.html(view.render().el); 
	  	});

	  },
	  enterName: function(gameId) {container.html(new EnterNameView().render().el); },
	  game: function(gameId, name) {container.html(new GameView().render().el);},
	  editGame: function(gameId, name) {container.html(new EditGameView().render().el);},
	  scoreboard: function(gameId, name) {container.html(new ScoreboardView().render().el);},

  });

  return MainRouter;
});

