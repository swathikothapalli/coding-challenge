var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
var PORT = 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());


app.post('/flightInfoChallenge', function (req, res) {
    console.log('post call happened');
    res.send('true');
});


app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
