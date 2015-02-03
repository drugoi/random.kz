var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var fs = require('fs');
var compression = require('compression');
var events = require('events');

var _event = new events.EventEmitter();

var port = process.env.PORT || 8080;
var app = connect().use(serveStatic(__dirname + '/public'));

var wordsUtilities = {
  fetch: function() {
    fs.readFile('public/assets/js/words.json', 'utf-8', function(err, data) {
      if (err) throw err;
      console.info(data);
      wordsLibrary = JSON.parse(data);
      return wordsLibrary;
    });
  },
  random: function() {
    var randomWord = wordsLibrary.words[Math.floor(Math.random() * wordsLibrary.words.length)].w;
    return randomWord;
  },
  render: function() {
    fs.readFile('public/_index.html', 'utf-8', function(err, data) {
      if (err) throw err;
      var htmlFile = data;
      if (!wordsLibrary) {
        wordsUtilities.fetch();
        wordsUtilities.compile(wordsUtilities.random(wordsLibrary), htmlFile);
      } else {
        wordsUtilities.compile(wordsUtilities.random(wordsLibrary), htmlFile);
      }
    });
  },
  compile: function(word, htmlFile) {
    var htmlContent = data.replace('{{word}}', word); 
    fs.writeFile('public/index.html', htmlContent, function(err) {
      if (err) throw err;
    });
  }
}

var wordsLibrary = wordsUtilities.fetch();

wordsUtilities.render();

app.use(function(req, res){
  wordsUtilities.render();
})

//create node.js http server and listen on port
http.createServer(app).listen(port)
