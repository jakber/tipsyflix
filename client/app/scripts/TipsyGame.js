define ("TipsyGame", ["backbone", "jquery", "socketio"], function(Backbone, $, io) {
			
			function TipsyGame() {

			};

			TipsyGame.prototype.start = function() {
				$.getJSON("http://localhost:3000/bla", {}, function(data){
					console.log(data);
				}); 
				var socket = io.connect("http://localhost:3000")
				socket.on("news", function(data) {
					console.log(data);
				})
			}

			TipsyGame.prototype.register = function(name) {
				console.log("register " + name)

			}
			return TipsyGame;
		}
	)