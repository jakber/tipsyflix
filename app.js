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

app.listen(3000)