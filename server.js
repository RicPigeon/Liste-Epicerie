var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var config = require('./config');
var Firebase = require("firebase");

var myFirebaseRef = new Firebase(config.database);

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


var api = require('./app/routes/api')(app, express);
app.use('/api', api);


app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/index.html')
});

app.listen(config.port, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port 3000');
	}
});

var jsdom = require("jsdom");

function notStringEmpty(element, index, array) {
	return (element !== "");
}
 

//Function qui obtient les ingredients des sites de cuisine !!
jsdom.env({
  url: "http://www.ricardocuisine.com/recettes/6370-jarrets-d--agneau-glaces-au-miel-de-sarrasin",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    var $ = window.$;
    var ingredients = $("[itemprop='ingredients']").text().trim().replace(/\t/g, '').split('\n').filter(notStringEmpty);

    console.log(ingredients);
  }
});