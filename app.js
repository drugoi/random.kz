var connect = require('connect');
var port = process.env.PORT || 8080;

var app = connect.createServer().use(connect.static(__dirname));
app.listen(port);