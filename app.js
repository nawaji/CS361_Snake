var path = require('path');
var express = require('express');

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

	res.status(200).render("index");

//	res.status(200).render("index", {
//		rankings_data
//	})

});

// when the user adds a listing to the ranks, this is where the
// teammate's service will be handled. 
router.post("/add-user-rank", function(req, res, next) {

	// call teammate's service and get the output

	// check if the user already is in the rankings

	// update/add the user in the rankings

	// call teammate's service (IF they allow updating of the .JSON)
	// to update the file, otherwise do it manually.

});

// update the rankings based on user input in the rankings
// however, this may be obsolete through the use of javascript
// interactions within the main page.
router.post("/update-visible-ranks", function(req, res) {

})

function sortUserRanks() {

}

function filterUserRanks() {

}

app.use("/", router);

app.listen(PORT, function() {
    console.log('Express started on http://local:' + PORT + '; press Ctrl-C to terminate.')
})