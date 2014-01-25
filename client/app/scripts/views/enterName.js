define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.enter_name({value:"enterNaame"}));
      return this;
    }
    ,events : {
            "click button#add-player-button" : "createPlayer"
    },
    createPlayer : function(event){
   		console.log("create player " + $("#player-name").val());
   		$.post("http://localhost:3000/game/" + this.gameId + "/player", {"name":$("#player-name").val()}, function(data, status, jq){
   			console.log("player created ");
   		});
    }
  });

  return GameView;
});
