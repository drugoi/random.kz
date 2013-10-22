var connect = require('connect');
var port = process.env.PORT || 8080;

var app = connect().use(connect.static(__dirname + '/public'));
app.listen(port);