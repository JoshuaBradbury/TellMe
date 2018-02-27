var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var morgan = require("morgan");
var https = require("https");
var http = require("http");
var fs = require("fs");

var upload = multer();
var app = express();

var options = {
	key: fs.readFileSync("/etc/letsencrypt/live/tellme.newagedev.co.uk/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/tellme.newagedev.co.uk/fullchain.pem")
};

app.disable('x-powered-by');

var router = express.Router();

router.use(morgan("dev"));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
}).options('*', function (req, res, next) {
	res.end();
});

router.post("/group", upload.array(), (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
		if (req.body.text) {
			res.status(200).json({"cat-text": req.body.text});
		} else {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(406);
	}
});

app.use(router);

https.createServer(options, app).listen(443, function() {
	console.log("Express is listening on port 443");
});
