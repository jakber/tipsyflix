define ("TipsyGame", ["backbone", "jquery"], function(Backbone, $) {
			
			function TipsyGame() {

			};

			TipsyGame.prototype.start = function() {
				$.getJSON("http://localhost:3000/bla", {}, function(data){
					console.log(data);
				}); 
			}

			TipsyGame.prototype.register = function(name) {
				console.log("register " + name)

			}
			return TipsyGame;
		}
	)