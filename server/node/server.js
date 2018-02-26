var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');

var upload = multer();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ ezxtended: true }));

var router = express.Router();

router.post("/cat", upload.array(), (req, res, next) => {
	if (req.body.text) {
		console.log("Text: " + req.body.text);
		res.status(200).json({"cat-text": req.body.text});
	} else {
		console.log("Request missing \"text\"");
		res.status(400).json({"error": "Sorry parameter \"text\" required in json object"})
	}
});

app.use(router);

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
