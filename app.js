var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'sea-anemone'}));
app.set('views', __dirname + '/views');



app.get("/", function(req, res) {
	res.render("index.jade");
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get("/bla", function(req, res) {
	
	res.json({
		"players": [
			{name:"jakob"}, 
			{name:"jocke"}
		]
	});
})

app.listen(3000)