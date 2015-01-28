var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var fs = require('fs');
var compression = require('compression');

var port = process.env.PORT || 8080;
var app = connect().use(serveStatic(__dirname + '/public'));
app.use(compression());

var fetchData = function() {
  fs.readFile('public/assets/js/words.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var wordsFile = JSON.parse(data);
    var word = wordsFile.words[Math.floor(Math.random() * wordsFile.words.length)].w;
    fs.readFile('public/_index.html', 'utf-8', function(err, data) {
      if (err) throw err;
      var htmlContent = data.replace('{{word}}', word); 
      fs.writeFile('public/index.html', htmlContent, function(err) {
        if (err) throw err;
      });
    });
  });
};

fetchData();

app.use(function(req, res){
	fetchData();
})

//create node.js http server and listen on port
http.createServer(app).listen(port)
