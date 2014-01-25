define(['backbone', 'compiled-templates', 'socketio'], function(Backbone, Handlebars, io){
var socket = null;

var GameView = Backbone.View.extend({
    initialize: function(options) {
        console.log("initializing with options " + options);
        var that = this;
        this.gameId = options.gameId;
        this.playerName = options.name;
        $.getJSON("http://localhost:3000/game/"+options.gameId+"/button", {}, function(data){
            console.log("got buttons");
            console.log(data);
            that.buttons = data;  
            that.render();
        });
        socket = io.connect("http://localhost:3000");
        socket.on('disconnect', function() { console.log("disconnected")})
        socket.on('connect',function (data) {
            console.log("connect for gameId " + that.gameId);
            socket.emit('join_game', {gameId: that.gameId}, function(response){ console.log(response)});
        });
        socket.on('game_started', function (data) {
            console.log("game_started " + data);
            that.renderPlay(data);
        });
        socket.on('round_ended', function (data) {
            console.log(data);
            that.renderWin(data);
            that.renderLose(data);
            setTimeout(function() {that.renderPlay();}, 1500);

        });
        socket.on('round_lost', function (data) {
            console.log(data);
            setTimeout(function() {that.renderPlay();}, 1500);
        });
    },

    render: function () {
        $(this.el).html(Handlebars.templates.waiting());
        return this;
    },
    renderPlay: function (data) {
        console.log("renderPlay");
        $(this.el).html(Handlebars.templates.game_started({buttons:this.buttons}));
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
    onEpic: function(event) {
        event.preventDefault();
        socket.emit("button_pushed", {"playerName":this.playerName, "gameId":this.gameId, "buttonId":event.currentTarget.id});
        return false;
    }
  });



  return GameView;
});
