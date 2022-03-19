var path = require('path');
var express = require('express');
var fs = require("fs");

var user_data = require("./leaderboards.json");

var uniqueIDs = [];

var app = express();
PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
var router = express.Router();

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');  //Import express-handlbars
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));

// serve the main web page
router.get("/", function(req, res, next) {

	res.status(200).render("index", { user_data });
});

// handle the incoming user entry for the leaderboards
router.post("/add-user-rank", function(req, res, next) {
	let data = req.body;

	console.log("== reqURL: " + req.url);
	console.log("== new entry: ", data);

	
	let if_new = updateLeaderboards(data.name, data.score);
	if (if_new) {
		user_data.push(data);
	}
	sortLeaderboards();
	res.status(200);
	res.send(user_data);
});

function sortLeaderboards() {
	let sort_result = user_data.sort((a, b) => b.score - a.score);
	fs.writeFile(__dirname + "/leaderboards.json", JSON.stringify(sort_result, null, 2), function (err) {
		if (err) {
			console.log("Error writing user to leaderboards.", err);
		}
	})
}

function updateLeaderboards(new_name, new_score) {
	for (i = 0; i < user_data.length; i++) {
		if (user_data[i].name == new_name) {
			if (user_data[i].score < new_score) {
				user_data[i].score = new_score;
			}
			return false;
		}
	}
	return true;
}

app.use("/", router);

app.listen(PORT, function() {
    console.log('Express started on http://local:' + PORT + '; press Ctrl-C to terminate.')
})