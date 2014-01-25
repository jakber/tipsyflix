define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.master_1_button({value:"editGame", "buttons":this.buttons}));
      return this;
    },
    events: {
    	"click button.addButton": "onAddButton",
    	"click button.startGame": "onStartGame"
    },
    onAddButton : function(event){
    	var buttonText = $("#button-text").val();
   		console.log("create button " + buttonText);
   		var that = this;
   		$.post("http://localhost:3000/game/" + this.gameId + "/button", {"text":buttonText}, function(data, status, jq){
   			console.log("button created ");
   			window.appRouter.navigate("game/" + that.gameId + "/" + this.name + "/edit", true);
   		});
    },
    onStartGame : function(event){
   		console.log("start game");
   		var that = this;
   		$.post("http://localhost:3000/game/" + this.gameId + "/start", {}, function(data, status, jq){
   			console.log("game started");
   			window.appRouter.navigate("game/" + that.gameId + "/" + this.name, true);
   		});	
    }
  });

  return GameView;
});
