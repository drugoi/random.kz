var connect = require('connect');
var fs = require('fs');
var port = process.env.PORT || 8080;
var app = connect().use(connect.static(__dirname + '/public'));

var fetchData;
var fetchWord;
var fetchHtml;


fs.readFile('public/assets/js/words.json', handleFile);
fs.readFile('public/index.html', 'utf-8', indexFile);

function handleFile(err, data) {
	if (err) throw err;
    fetchData = JSON.parse(data);
	fetchWord = fetchData.words[Math.floor(Math.random() * fetchData.words.length)].w;
}

function indexFile(err, data) {
	if (err) throw err;
	fetchHtml = data.toString().replace('{{kazakh_word}}', fetchWord);
	fs.writeFile('public/index.html', fetchHtml, function(err){
		if (err) throw err;
	});
}

app.listen(port);