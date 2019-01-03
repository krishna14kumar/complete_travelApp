var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();
var router = express.Router();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
var bodyParser = require('body-parser');

var ObjectID = require("mongodb").ObjectID;
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
var dbo
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("test");
    //Create a collection name "Trip":
    dbo.createCollection("Trip", function (err, res) {
    });
});

app.post('/plan-trip', urlencodedParser, function (req, res) {
    console.log("Krishna===================>")
    // Prepare output in JSON format
    response = {
        Date : req.body.date,
        Place : req.body.place,
        Place : req.body.type
    };
    console.log("--------------->" + response);
    console.log("Raja===================>")
    // res.end(JSON.stringify(response));
    // dbo.collection("Trip").insertOne(response, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    // });
    // res.redirect('/add');
});
module.exports = router;
