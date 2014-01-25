define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var HomeView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.home({value:"home", games:this.games}));
      return this;
    },
    events: {
    	"click button#create-game": "onCreateGame"
    },
    onCreateGame : function(event){
		var gameName = $("#game-name").val();
   		console.log("create game " + gameName);
		var that = this;
   		$.post("http://localhost:3000/game", {"name":gameName}, function(data, status, jq){
   			console.log("game created " + data.id);
   			window.appRouter.navigate("game/" + data.id + "/edit", true);
   		});
    }
    
  });

  return HomeView;
});
