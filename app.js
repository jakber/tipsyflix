var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'sea-anemone'}));
app.set('views', __dirname + '/views');

var server = require("http").createServer(app)
var io = require("socket.io").listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


app.get("/", function(req, res) {
	res.render("index.jade");
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


var games = {
  "0": {
    "name": "pulp fiction",
    "players": [
      {
        "nickname": "pelle",
        "id": 1
      },
      {
        "nickname": "nisse",
        "id": 2
      }
    ],
    "id": 0,
    "buttons": [
      {
        "id": 3,
        "text": "awesome"
      }
    ],
    status:"pending"
  }
};
var id = 4;

// /game GET -> [game1, game2,...] /* GET all games */
// /game POST {name} /* add game */
// /game/:id/player POST {nickname} /* add player to game */
// /game/:id/player GET [nickname1, nickname2,..] /* GET all players in game */
// /game/:id/button POST {text} /* add button to game */
// /game/:id/start POST /* start game */
// /game/:id/button GET [{text:"button text 1", id:0}, {text:"button text 2", id:1} ,...] /* GET all buttons in game */
// /game/:id/button/:id POST /* push button in game */
// /game/:id DELETE /* end game */
// /game/:id GET /* get game stats */

app.get("/game", function(req, res) {
	console.log("get all games");
	res.json(
		games
	);
});

app.post("/game", function(req, res) {
	var name = req.body.name;
	console.log("create game " + name);
	
	var gameId = id++;

	if(name in games){
		// already exists

	} else {
		games[gameId] = {"name":name, "players":[], "id":gameId, "buttons":[], status:"pending"};
	}

	res.json(
		games
	);
});

app.post("/game/:gameId/player", function(req, res) {
	var gameId = req.param("gameId");
	console.log("create player in game " + gameId);
	
	var game = games[gameId];
	
	game.players.push({"name":req.body.name,"id":id++});

	res.json(
		game
	);
});

app.get("/game/:gameId/player", function(req, res) {
	var gameId = req.param("gameId");
	console.log("get all players in game " + gameId);

	var game = games[gameId];
	
	res.json(
		game.players
	);
});

app.post("/game/:gameId/button", function(req, res) {
	var gameId = req.param("gameId");
	console.log("create button in game " + gameId);

	var buttonText = req.body.text;

	var game = games[gameId];

	game.buttons.push({"id":id++, "text":buttonText});
	
	res.json(
		game.buttons
	);
});

app.post("/game/:gameId/start", function(req, res) {
	var gameId = req.param("gameId");
	console.log("start game " + gameId);

	var game = games[gameId];
	game.status = "ongoing";

	res.json(
		game.status
	);
});

app.get("/game/:gameId/button", function(req, res) {
	var gameId = req.param("gameId");
	console.log("start game " + gameId);

	var game = games[gameId];

	res.json(
		game.buttons
	);
});

app.post("/game/:gameId/button/:buttonId", function(req, res) {
	var gameId = req.param("gameId");
	var buttonId = req.param("buttonId");
	console.log("in game " + gameId + " push button " + buttonId);

	var game = games[gameId];
	
	res.json(
		game
	);
});

app.get("/game/:gameId", function(req, res, next) {
	var gameId = req.param("gameId");
	console.log("get game stats" + gameId);

	var game = games[gameId];

	res.json(
		game
	);
});

app.del("/game/:gameId", function(req, res, next) {
	var gameId = req.param("gameId");
	console.log("end game " + gameId);

	var game = games[gameId];

	game.status = "ended";

	res.json(
		game
	);
});

app.listen(3000)
