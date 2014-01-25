define(['backbone', 'compiled-templates', 'config'], function(Backbone, Handlebars, config){
  var HomeView = Backbone.View.extend({
  	initialize: function() {
  		var that = this;
  		$.getJSON(config.server + "/game", {}, function(data){
			that.games = data;	
			that.render(); 
	  	});
  	},
    render: function () {
      this.$el.html(Handlebars.templates.home({value:"home", games:this.games}));
      return this;
    },
    events: {
    	"click button#create-game, submit form": "onCreateGame"
    },
    onCreateGame : function(event){
		var gameName = $("#game-name").val();
   		console.log("create game " + gameName);
		var that = this;
   		$.post(config.server + "/game", {"name":gameName}, function(data, status, jq){
   			console.log("game created " + data.id);
   			window.appRouter.navigate("game/" + data.id + "/edit", true);
   		});
   		event.preventDefault();
    }
    
  });

  return HomeView;
});
