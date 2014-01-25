define(['backbone', 'compiled-templates', 'socketio'], function(Backbone, Handlebars, io){
  var socket = null;

  var GameView = Backbone.View.extend({
    initialize: function(options) {
      console.log(options);
      var that = this;
      $.getJSON("http://localhost:3000/game/"+options.gameId+"/button", {}, function(data){
        console.log("got buttons");
        console.log(data);
        that.buttons = data;  
        that.render();
      });
    },

    render: function () {
        $(this.el).html(Handlebars.templates.waiting());
        var that = this;
        socket = io.connect("http://localhost:3000");

        socket.on('connect',function (data) {
            console.log("connect");
            socket.emit('join_game', that.gameId, function(response){ console.log(response)});
        });

        socket.on('game_started', function (data) {
            console.log("game_started " + data);
            that.renderPlay(data);
        });
        socket.on('round_ended', function (data) {
            console.log(data);
            that.renderWin(data);
            setTimeout(function() {that.renderPlay();}, 1500);

        });
        socket.on('round_lost', function (data) {
            console.log(data);
            that.renderLose(data);
            setTimeout(function() {that.renderPlay();}, 1500);
        });
        socket.emit("game_joined", {"playerName":this.playerName, "gameId":this.gameId});
        return this;
    },
    renderPlay: function (data) {
        console.log("renderPlay");
        $(this.el).html(Handlebars.templates.game_started(data));
        return this;
    },
    renderLose: function (data) {
        console.log("renderLose");

        $(this.el).html(Handlebars.templates.lose(data));
        return this;
    },
    renderWin: function (data) {
        console.log("renderWin");
        $(this.el).html(Handlebars.templates.win(data));
        return this;
    },

    events: {
        "click button.play": "onEpic"
    },
    onEpic: function() {
        socket.emit("button_pushed", {"playerName":this.playerName, "gameId":this.gameId});
    }
  });



  return GameView;
});
