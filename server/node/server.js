var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var morgan = require("morgan");
var https = require("https");
var http = require("http");
var fs = require("fs");
var mysql = require("mysql2/promise");


var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "mysql-dev",
  user            : "root",
  password        : "seggroupproj",
  database        : "database_mysql"
});

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

const asyncMiddleware = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

const queryError = function (err, results, fields) {
	if (err) {
		throw err;
	}
};

async function query(q, params) {
	const query = await pool.query(q, params, queryError);

	return query;
}

function isString(obj) {
	return typeof obj === 'string' || myVar instanceof String;
}

router.post("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
		if (req.body.name && isString(req.body.name)) {
			const existing = await query("SELECT * FROM modules WHERE `module_name` = ?", [req.body.name]);
			if (existing[0].length == 0) {
				var group = { module_name: req.body.name };
				const q = await query('INSERT INTO modules SET ?', group);
				res.status(201).json({"status": 201, "message": "Created: group created", "groupid": q[0].insertId});
			} else {
				res.status(400).json({"status": 400, "message": "Bad Request: Group already exists. If you want information about the group use GET, or if you want to add/remove members use PUT"});
			}
		} else {
			res.status(400).json({"status": 400, "message": "Bad Request: name parameter must be specified in the body"});
		}
	} else {
		res.sendStatus(406);
	}
}));

router.delete("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
		if (req.body.name && isString(req.body.name)) {
			const existing = await query("SELECT * FROM modules WHERE `module_name` = ?", [req.body.name]);
			if (existing[0].length == 0) {
				res.status(400).json({"status": 400, "message": "Bad Request: Group doesn't exist"});
			} else {
				const q = await query("DELETE FROM modules WHERE `module_name` = ?", [req.body.name]);

				res.status(200).json({"status": 200, "message": "Ok: " + q[0].affectedRows + " group(s) deleted"});
			}
		} else {
			res.status(400).json({"status": 400, "message": "Bad Request: name parameter must be specified in the body"});
		}
	} else {
		res.sendStatus(406);
	}
}));

router.get("/api/v1.0/announcement/:groupid", upload.array(), (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
		if (req.query) {
			if (req.query.date) {

			} else if (req.query.n) {
				if (req.query.n == "all") {

				} else {
					var count = Number(req.query.n);
					if (count) {

					}
				}
			}
			res.status(200).json({"announcements": {}});
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
