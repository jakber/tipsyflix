define(['backbone', 'compiled-templates', 'socketio', 'config', 'underscore'], function(Backbone, Handlebars, io, config){
var socket = null;

var GameView = Backbone.View.extend({
    initialize: function(options) {
        console.log("initializing with options " + options);
        var that = this;
        this.gameId = options.gameId;
        this.playerName = options.name;
    },

    render: function () {
        var that = this;
        socket = io.connect(config.server);
        socket.on('disconnect', function() { console.log("disconnected")})
        socket.on('connect',function (data) {
            console.log("connect for gameId " + that.gameId);
            socket.emit('join_game', {gameId: that.gameId, playerName: that.playerName}, function(response){ console.log(response)});
        });
        socket.on('game_started', function (data) {
            console.log("game_started " ,data);
            that.buttons = data.buttons;
            that.renderPlay();
        });
        socket.on('round_ended', function (data) {
            console.log(data);
            if (data.winners.indexOf(that.playerName) != -1)
                that.renderWin(data);
            else
                that.renderLose(data);
            setTimeout(function() {that.renderPlay();}, 2000);

        });
        socket.on('game_ended', function(data) {
            console.log("game ended", data);
            window.appRouter.navigate("game/" + that.gameId + "/" + that.playerName +"/scores", true);
        })
        return this;
    },
    renderPlay: function () {
        console.log("renderPlay");
        var that = this;
        $.getJSON(config.server + "/game/" + this.gameId + "/player", {}, function(data) {
            var player = _.first(_.filter(data, function(e) { return e.name == that.playerName }));
            var playerScore = player.wins - player.losses;
            that.$el.html(Handlebars.templates.game_started({buttons:that.buttons, score:playerScore, master: (data[0].name == that.playerName)}));
        });
        
        return this;
    },
    renderLose: function (data) {
        console.log("renderLose", data);
        var that = this;
        //var losers = data.losers.filter(function(s) {return s != that.playerName});
        //var message = losers.length > 0 ? "So did " + losers.join(", ").replace(/, ([^,]*$)/, " and $1") : "By yourself";
        var message = data.voters.join(", ").replace(/, ([^,]*$)/, " and $1") + " thought that was <strong>" + data.button + "</strong>";
        this.$el.html(Handlebars.templates.lose({message:message}));
        return this;
    },
    renderWin: function (data) {
        console.log("renderWin", data);
        var that = this;
        //var winners = data.winners.filter(function(s) {return s != that.playerName});
        //var message = winners.length > 0 ? "So did " + winners.join(", ").replace(/, ([^,]*$)/, " and $1") : "By yourself";
        var message = data.voters.join(", ").replace(/, ([^,]*$)/, " and $1") + " thought that was <strong>" + data.button + "</strong>";
        this.$el.html(Handlebars.templates.win({message:message}));
        return this;
    },

    events: {
        "click button.play": "onEpic",
        "click button.bad": "onEndGame",
    },
    onEpic: function(event) {
        console.log("Changing class on button ", $("#"+event.currentTarget.id));
        $("#"+event.currentTarget.id).addClass("pressed");
        socket.emit("button_pushed", {"playerName":this.playerName, "gameId":this.gameId, "buttonId":event.currentTarget.id});
        event.preventDefault();
    },
    onEndGame: function(event) {
        socket.emit("end_game", {"playerName":this.playerName, "gameId":this.gameId});
        event.preventDefault();
    }
  });

  return GameView;
});
