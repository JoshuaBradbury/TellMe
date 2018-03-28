var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var morgan = require("morgan");
var https = require("https");
var http = require("http");
var fs = require("fs");
var mysql = require("mysql2/promise");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tellme-65b91.firebaseio.com"
});

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

function fromB64(str) {
    return Buffer.from(str, "base64").toString("utf8");
}

function isString(obj) {
	return obj && typeof obj === 'string' || obj instanceof String;
}

function asNumber(obj) {
    if (obj) {
        var n = Number(obj);

        if (n !== NaN) {
            return n;
        }
    }

    return null;
}

function convertUserToEmail(user) {
    if (isString(user)) {
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
    if (isString(user)) {
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
    if (isString(user)) {
        if (user.indexOf("Basic") !== -1) {
            user = fromB64(user.split(" ")[1]);
            if (user.indexOf(":") !== -1) {
                user = user.replace(":", "");
            }

            const q = await query("SELECT * FROM authorised_logins WHERE `email` = ? ", [convertUserToEmail(user)]);

            return q && q[0].length > 0;
        }
    }
    return false;
}

async function isUserAuthorisedForRead(user) {
    if (isString(user)) {
        if (user.indexOf("Basic") !== -1) {
            user = fromB64(user.split(" ")[1]);
            if (user.indexOf(":") !== -1) {
                user = user.replace(":", "");
            }

            const q = await query("SELECT * FROM students_in_groups WHERE `k_number` = ?", [convertEmailToUser(user)]);

            return q && (q[0].length > 0 || isUserAuthorisedForWrite(user));
        }
    }
    return false;
}

async function getGroupByNameOrId(gid, gname) {
    var groupq,
        modid = false,
        valid = false,
        foundGroup = false;
    if (gid) {
        const q = await query("SELECT * FROM modules WHERE `module_id` = ?", [gid]);

        if (q[0].length > 0) {
            modid = true;
            valid = true;
            groupq = q;
        }
    }

    if (gname && isString(gname)) {
        valid = true;
    }

    if (valid) {
        if (!modid) {
            const q = await query("SELECT * FROM modules WHERE `module_name` = ?", [gname]);
            groupq = q;

            if (groupq[0].length == 0) {
                return [];
            }
        }

        return groupq;
    }
    return [];
}

router.options("/*", upload.array(), asyncMiddleware(async (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.send(200);
}));

router.get("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForRead(req.get("authorization"))) {
            var groupq = await getGroupByNameOrId(req.query.groupId, req.query.groupName);

            if (groupq.length > 0) {
                res.status(200).json({"status": 200, "message": "Ok: group found", "groupId": groupq[0][0].module_id, "groupName": groupq[0][0].module_name});
            } else if (req.query.groupId || req.query.groupName) {
                res.status(400).json({"status": 400, "message": "Bad Request: groupId or groupName isn't valid"});
            } else {
                var groups = [];
                if (await isUserAuthorisedForWrite(req.get("authorization"))) {
                    const q = await query("SELECT * FROM modules");

                    for (var i in q[0]) {
                        var row = q[0][i];
                        groups.push({"groupId": row.module_id, "groupName": row.module_name});
                    }
                } else {
                    user = fromB64(req.get("authorization").split(" ")[1]);
                    if (user.indexOf(":") !== -1) {
                        user = user.replace(":", "");
                    }

                    const q = await query("SELECT * FROM modules WHERE `module_id` in (SELECT module_id FROM students_in_groups WHERE `k_number` = ?)", [convertEmailToUser(user)]);

                    for (var i in q[0]) {
                        var row = q[0][i];
                        groups.push({"groupId": row.module_id, "groupName": row.module_name});
                    }
                }

                res.status(200).json({"status": 200, "message": "Ok: All " + groups.length + " group(s) have been selected", "groups": groups});
            }
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
	} else {
		res.sendStatus(406);
	}
}));

router.get("/api/v1.0/group/users", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
            var groupq = await getGroupByNameOrId(req.query.groupId, req.query.groupName);

            if (groupq.length > 0) {
                const q = await query("SELECT k_number FROM students_in_groups WHERE `module_id` = ?", [groupq[0][0].module_id]);

                var students = [];

                for (var i in q[0]) {
                    students.push("k" + q[0][i].k_number);
                }

                res.status(200).json({"status": 200, "message": "Ok: group found", "groupId": groupq[0][0].module_id, "groupName": groupq[0][0].module_name, "students": students});
            } else if (req.query.groupId || req.query.groupName) {
                res.status(400).json({"status": 400, "message": "Bad Request: groupId or groupName isn't valid"});
            } else {
                res.status(400).json({"status": 400, "message": "Bad Request: groupName or groupId must be specified in the body"});
            }
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
    } else {
        res.sendStatus(406);
    }
}));

router.post("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
    		if (req.body.groupName && isString(req.body.groupName)) {
    			const existing = await query("SELECT * FROM modules WHERE `module_name` = ?", [req.body.groupName]);
    			if (existing[0].length == 0) {
    				var group = { module_name: req.body.groupName };
    				const q = await query('INSERT INTO modules SET ?', group);
    				res.status(201).json({"status": 201, "message": "Created: group created", "groupid": q[0].insertId, "groupName": req.body.groupName});
    			} else {
    				res.status(400).json({"status": 400, "message": "Bad Request: Group already exists. If you want information about the group use GET, or if you want to add/remove members use PUT"});
    			}
    		} else {
    			res.status(400).json({"status": 400, "message": "Bad Request: groupName must be specified in the body"});
    		}
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
	} else {
		res.sendStatus(406);
	}
}));

router.put("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
    		if (req.body.users && req.body.users.constructor === Array) {
                var groupq = await getGroupByNameOrId(req.body.groupId, req.body.groupName);
                if (groupq.length > 0) {
                    var groupid = groupq[0][0].module_id,
                        cleanUsers = [],
                        users = req.body.users;

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

                    res.status(201).json({"status": 201, "message": "Created: " + createdCount + " user(s) added to the group " + groupid});
                } else {
                    res.status(400).json({"status": 400, "message": "Bad Request: groupId or groupName must be specified in the body"});
                }
    		} else {
    			res.status(400).json({"status": 400, "message": "Bad Request: users parameter must be specified as an array in the body"});
    		}
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
	} else {
		res.sendStatus(406);
	}
}));

router.delete("/api/v1.0/group/", upload.array(), asyncMiddleware(async (req, res, next) => {
	if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
            var groupq = await getGroupByNameOrId(req.body.groupId, req.body.groupName);
            if (groupq.length > 0) {
                var groupid = groupq[0][0].module_id;
    			const q = await query("DELETE FROM modules WHERE `module_id` = ?", [groupid]);

    			res.status(200).json({"status": 200, "message": "Ok: " + q[0].affectedRows + " group(s) deleted"});
    		} else {
    			res.status(400).json({"status": 400, "message": "Bad Request: groupName or groupId must be specified in the body"});
    		}
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
	} else {
		res.sendStatus(406);
	}
}));

router.get("/api/v1.0/announcement/:groupid", upload.array(), asyncMiddleware(async (req, res, next) => {
    if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForRead(req.get("authorization"))) {
            var retval;
            if (req.query) {
                const time = asNumber(req.query.date);
                if (time) {
                    retval = await query("SELECT * FROM messages_sent WHERE UNIX_TIMESTAMP(time_sent) BETWEEN ? AND UNIX_TIMESTAMP(NOW())", [time]);
                } else if (req.query.n) {
                    if (req.query.n == "all") {
                        retval = await query("SELECT * FROM messages_sent WHERE `module_id` = ?", [req.params.groupid]);
                    } else {
                        var count = Number(req.query.n);
                        if (count) {
                            retval = await query("SELECT * FROM messages_sent WHERE `module_id` = ? ORDER BY `time_sent` DESC LIMIT ?", [req.params.groupid, count]);
                        }
                    }
                }
                if (retval) {
                    res.status(200).json({"status": 200, "announcements": retval[0]});
                } else {
                    res.status(400).json({"status": 400, "message": "Bad Request: no valid parameters"});
                }
            } else {
                res.status(400).json({"status": 400, "message": "Bad Request: no parameters"});
            }
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
    } else {
        res.sendStatus(406);
    }
}));

router.delete("/api/v1.0/announcement/", upload.array(), asyncMiddleware(async (req, res, next) => {
    if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
            if (req.body.announcement_id) {
                var announcementExists = await query('SELECT * FROM messages_sent WHERE `announcement_id` = ?', [req.body.announcement_id]);
                if (!announcementExists[0].length) {
                    res.status(400).json({"status": 400, "message": "Bad Request: announcement does not exist."});
                } else {
                    const deleteQuery = await query('DELETE FROM messages_sent WHERE `announcement_id` = ?', [req.body.announcement_id]);
                    res.status(202).json({"status": 202, "message": "Successfully deleted announcement."});
                }
            } else {
                res.status(400).json({"status": 400, "message": "Bad Request: announcement id missing."});
            }
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
    } else {
        res.sendStatus(406);
    }
}));

router.post("/api/v1.0/announcement/", upload.array(), asyncMiddleware(async (req, res, next) => {
    if (req.secure && req.accepts('application/json')) {
        res.header("Access-Control-Allow-Origin", "*");
        if (await isUserAuthorisedForWrite(req.get("authorization"))) {
            var groupq = await getGroupByNameOrId(req.body.groupId, req.body.groupName);
            if (groupq.length > 0 && isString(req.body.announcement) && isString(req.body.subject)) {
                var groupid = groupq[0][0].module_id;
                var insert = {module_id: groupid, message: req.body.announcement, subject: req.body.subject};
                const q = await query('INSERT INTO messages_sent SET ?', insert);
                var message = {
                    android: {
                        priority: "high"
                    },
                    data: {
                        subject: req.body.subject,
                        message: req.body.announcement,
                        group: groupid.toString()
                    },
                    condition: "'announcements' in topics"
                };

                admin.messaging().send(message).then((response) => {
                    res.status(201).json({"status": 201, "message": "Created: successfully sent new announcement", "response": response});
                }).catch((error) => {
                    console.log('Error sending message:', error);
                });
            } else {
                res.status(400).json({"status": 400, "message": "Bad Request: groupName or groupId, announcement and subject parameters must be specified in the body"});
            }
        } else {
            res.status(401).json({"status": 401, "message": "Unauthorised"});
        }
    } else {
        res.sendStatus(406);
    }
}));

app.use(router);

https.createServer(options, app).listen(443, function() {
	console.log("Express is listening on port 443");
});
