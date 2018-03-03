var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var morgan = require("morgan");
var https = require("https");
var http = require("http");
var fs = require("fs");
var mysql = require("mysql2/promise");


var pool = mysql.createPool({
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

function convertUserToEmail(user) {
    if (user && isString(user)) {
        var u = user;

        if (u.toLowerCase().indexOf("k") === -1) {
            u = "k" + u;
        }

        if (u.indexOf("@") === -1) {
            u = u + "@kcl.ac.uk";
        }

        return u;
    }
    return user;
}

function convertEmailToUser(user) {
    if (user && isString(user)) {
        var u = user;
        if (u.indexOf("@") !== -1) {
            u = u.split("@")[0];
        }

        if (u.toLowerCase().indexOf("k") !== -1) {
            u = u.toLowerCase().replace("k", "");
        }

        u = Number(u);

        if (u !== NaN) {
            return u;
        }
    }
    return user;
}

async function isUserAuthorisedForWrite(user) {
    const q = await query("SELECT * FROM authorised_logins WHERE `email` = ? ", [convertUserToEmail(user)]);

    return q && q[0][0].length > 0;
}

async function isUserAuthorisedForRead(user) {
    const q = await query("SELECT * FROM students_in_groups WHERE `k_number` = ?", [convertEmailToUser(user)]);

    return q && (q[0][0].length > 0 || isUserAuthorisedForWrite(user));
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

router.put("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
		if (req.body.users && req.body.users.constructor === Array) {
            var modid = false,
                valid = false;

            var groupid;
            if (req.body.groupid) {
                const q = await query("SELECT * FROM modules WHERE `module_id` = ?", [req.body.groupid]);

                if (q[0].length > 0) {
                    modid = true;
                    valid = true;
                    groupid = q[0][0].module_id;
                }
            }

            if (req.body.group_name && isString(req.body.group_name)) {
                valid = true;
            }

            if (valid) {
                if (!modid) {
                    const q = await query("SELECT * FROM modules WHERE `module_name` = ?", [req.body.group_name]);
                    groupid = q[0][0].module_id;
                }

                var cleanUsers = [];
                var users = req.body.users;

                for (var i in users) {
                    var user = users[i];
                    if (user && isString(user)) {
                        if (user.indexOf("@") !== -1) {
                            user = user.split("@")[0];
                        }

                        if (user.toLowerCase().indexOf("k") !== -1) {
                            user = user.toLowerCase().replace("k", "");
                        }

                        user = Number(user);

                        if (user !== NaN) {
                            cleanUsers.push(user);
                        }
                    }
                }

                var createdCount = 0;

                for (var i in cleanUsers) {
                    var user = cleanUsers[i];
                    const sel = await query("SELECT * FROM students_in_groups WHERE `module_id` = ? and `k_number` = ?", [groupid, user]);
                    if (sel[0].length == 0) {
                        const q = await query("INSERT INTO students_in_groups SET ?", {"module_id": groupid, "k_number": user});
                        createdCount += 1;
                    }
                }

                res.status(201).json({"status": 201, "message": "Created: " + createdCount + " user(s) added to the group " + groupid})
            } else {
                res.status(400).json({"status": 400, "message": "Bad Request: groupid or group_name not specified or doesn't exist"})
            }
		} else {
			res.status(400).json({"status": 400, "message": "Bad Request: users parameter must be specified as an array in the body"});
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
