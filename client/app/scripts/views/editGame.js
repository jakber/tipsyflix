define(['backbone', 'compiled-templates', 'config'], function(Backbone, Handlebars, config){
  var GameView = Backbone.View.extend({
  	initialize: function(options) {
  		console.log(options);
  		var that = this;
  		$.getJSON(config.server + "/game/"+options.gameId+"/button", {}, function(data){
			console.log("got buttons");
			that.buttons = data;	
			that.render();
	  	});
  	},
    render: function () {
    	console.log("render");
    	this.$el.html(Handlebars.templates.master_1_button({value:"editGame", "buttons":this.buttons}));
    	return this;
    },
    events: {
    	"click button.addButton, submit form": "onAddButton",
    	"click button.startGame": "onStartGame"
    },
    onAddButton : function(event){
    	var buttonText = $("#button-text").val();
   		console.log("create button " + buttonText);
   		var that = this;
   		$.post(config.server + "/game/" + this.gameId + "/button", {"text":buttonText}, function(data, status, jq){
   			console.log("button created ");
   			that.buttons.push({text:buttonText});
   			that.render();
   		});
   		event.preventDefault();
    },
    onStartGame : function(event){
   		console.log("start game");
   		var that = this;
   		$.post(config.server + "/game/" + this.gameId + "/start", {}, function(data, status, jq){
   			console.log("game started");
   			window.appRouter.navigate("game/" + that.gameId, true);
      }); 
      event.preventDefault(); 
    }
  });

  return GameView;
});
