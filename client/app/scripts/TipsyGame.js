define ("TipsyGame", ["backbone", "jquery", "socketio", "views/game"], function(Backbone, $, io, GameView) {
			
			function TipsyGame() {

			};

			TipsyGame.prototype.start = function() {
				$.getJSON("http://localhost:3000/game?gameId=jocke", {}, function(data){
					console.log(data);
				}); 
				var socket = io.connect("http://localhost:3000")
				socket.on("news", function(data) {
					console.log(data);
				})
				new GameView();
			}

			TipsyGame.prototype.register = function(name) {
				console.log("register " + name)

			}
			return TipsyGame;
		}
	)