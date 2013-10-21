var express = require("express");
var app = express();
app.use(express.logger());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
	response.render('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});