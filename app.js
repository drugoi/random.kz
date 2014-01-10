var connect = require('connect');
var fs = require('fs');
var handlebars = require("handlebars");

var port = process.env.PORT || 8080;
var app = connect().use(connect.static(__dirname + '/public'));

var fetchData = JSON.parse(fs.readFileSync('public/assets/js/words.json', 'utf-8'));
var fetchWord = fetchData.words[Math.floor(Math.random() * fetchData.words.length)].w;

var data = {
    word: fetchWord
}
    
var templateFile = fs.readFileSync('public/_index.html', 'utf8');
var compileFile = handlebars.compile(templateFile);

fs.writeFile('public/index.html', compileFile(data), function(err) {
   if (err) throw err;
    console.log(compileFile);
});

app.listen(port);