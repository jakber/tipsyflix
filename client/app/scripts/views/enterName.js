define(['backbone', 'compiled-templates', 'config'], function(Backbone, Handlebars, config){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.enter_name({value:"enterNaame"}));
      return this;
    }
    ,events : {
            "click button#add-player-button, submit form" : "createPlayer"
    },
    createPlayer : function(event){
    	var playerName = $("#player-name").val();
   		console.log("create player " + playerName);
   		var that = this;
   		$.post(config.server + "/game/" + this.gameId + "/player", {"name":playerName}, function(data, status, jq){
   			console.log("player created ");
   			window.appRouter.navigate("game/" + that.gameId + "/" + playerName, true);
   		});
   		event.preventDefault();
    }
  });

  return GameView;
});
