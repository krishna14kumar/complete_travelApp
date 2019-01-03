var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const cors =require("cors");
var port = 4001;
var routes = require("./routes/routes")
var app =express();
var dbo
var newData;
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true
    })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("test");
    //Create a collection name "Trip":
    dbo.createCollection("Trip", function (err, res) {
    });
});

app.post('/plan-trip', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        Date : req.body.date,
        Place : req.body.place,
        Type : req.body.type
    };
    newData = response;
    console.log("newdata ====>", newData)
    console.log("--------------->", response);
    dbo.collection("Trip").insertOne(response, function (err, obj) {
        if (err) throw err;
        console.log("1 document inserted");
        res.redirect('http://localhost:3000/list')
    });
    
});

app.get('/show', function (req, res) {
    dbo.collection("Trip").find().toArray(function (err, result) {
        if (err) throw err;
        console.log("result =====>", result);
        res.end(JSON.stringify(result));
    });
})

// app.use("/add", routes)
app.listen(port, function(){
    console.log("server started on port: " + port);
})