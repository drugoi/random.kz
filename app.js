var express = require('express');
var app = express.createServer();
var port = process.env.PORT || 5000;

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(port);