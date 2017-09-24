// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var shell      = require('node-cmd');
var tcp        = require('tcp-proxy');

var path = __dirname

var server = tcp.createServer({
  target: {
    host: '127.0.0.1',
    port: 8080
  }
});

server.listen(8081);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var count = 0;

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
}, bodyParser.json());

router.get('/', function(req, res, err) {
	res.sendFile(path + "/index.html");
});

router.get('/styles.css', function(req, res, err) {
	res.sendFile(path + "/styles.css");
});

router.get('/spam', function(req, res, err) {
	res.sendFile(path + "/spam.html");
});

router.get('/images/:image', function(req, res, err) {
	res.sendFile(path + "/images/" + req.params.image);
});

router.post('/api', function(req, res, next) {
	var received = req.body.Value;
	console.log('Recieved data' + req.body.Value);
	if (received == 1) {
		count++;
	}

	if(count < 3) {
		res.json(1);
	} else {
		res.json(0);
	}
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
