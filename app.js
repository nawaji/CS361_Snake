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

router.get("/", function(req, res, next) {

	res.status(200).render("index");
});

app.use("/", router);

app.listen(PORT, function() {
    console.log('Express started on http://local:' + PORT + '; press Ctrl-C to terminate.')
})