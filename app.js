var connect = require('connect');
var fs = require('fs');
var port = process.env.PORT || 8080;
var app = connect().use(connect.static(__dirname + '/public'));

var fetchData;
var fetchWord;
var newHtml;
var oldHtml;

function createKzWord() {
	fetchData = JSON.parse(fs.readFileSync('public/assets/js/words.json', 'utf-8'));
	fetchWord = '<span class="b-random__word">' + fetchData.words[Math.floor(Math.random() * fetchData.words.length)].w + '</span>';
	return fetchWord;
}

function getHtml() {
	oldHtml = fs.readFileSync('public/_index.html', 'utf-8');
	newHtml = oldHtml.toString().replace('<span class="b-random__word">{{kazakh_word}}</span>', fetchWord);
}
app.use(createKzWord);
app.use(getHtml);

fs.writeFile('public/index.html', newHtml, function (err) {
	if (err) throw err;
});
app.listen(port);