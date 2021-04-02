// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function (req, res) {
  
  let date = req.params.date;
  let toUTC = 0;
  let toUnix = 0;
  
  tmp = new Date();
  toUTC = tmp.toUTCString();
  toUnix = tmp.getTime() / 1000;
  toUnix =  toUnix.toString().replace('.', '');

  let obj = {
      unix:toUnix, 
      utc:toUTC
    }
    res.json(obj);
  
});

app.get("/api/timestamp/:date?", function (req, res) {
  
  let date = req.params.date;
  let toUTC = 0;
  let toUnix = 0;
  if (date != undefined) {

    let tmp = new Date(date);
    var num = isNaN(parseInt(date)) ? 0 : parseInt(date)
    if ( tmp !== "Invalid Date" && !isNaN(new Date(tmp))) {
      toUTC = tmp.toUTCString();
      toUnix = tmp.getTime() / 1000;
    } else if (num != 0) {
      toUnix = num;
      const unixTime = num;
      tmp = new Date(unixTime);
      toUTC = tmp.toUTCString();
    } 
    else {
      return res.json({ error : "Invalid Date" });
    }         
  } else {

    tmp = new Date();
    toUTC = tmp.toUTCString();
    toUnix = tmp.getTime() / 1000;
    toUnix =  toUnix.toString().replace('.', '');

  }

  let obj = {
      unix:toUnix, 
      utc:toUTC
    }
    res.json(obj);
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
