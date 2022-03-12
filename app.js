var path = require('path');
var express = require('express');
var fs = require("fs");

var user_data = require("./leaderboards.json");

var app = express();
PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
var router = express.Router();

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');  //Import express-handlbars
const { fstat } = require('fs');
const { resourceUsage } = require('process');
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

	user_data.push(data);
	sortLeaderboards();
	res.status(200);
	res.send("it worked!");
});

function sortLeaderboards() {
	let sort_result = user_data.sort((a, b) => b.score - a.score);
	fs.writeFile(__dirname + "/leaderboards.json", JSON.stringify(sort_result, null, 2), function (err) {
		if (err) {
			console.log("Error writing user to leaderboards.", err);
		}
	})
}


// update the rankings based on user input in the rankings
// however, this may be obsolete through the use of javascript
// interactions within the main page.
router.post("/update-visible-ranks", function(req, res) {

})

app.use("/", router);

app.listen(PORT, function() {
    console.log('Express started on http://local:' + PORT + '; press Ctrl-C to terminate.')
})