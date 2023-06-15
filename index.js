// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

let CORS = "https://en.wikipedia.org/wiki/Cross-origin_resource_sharing"
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

app.get("/api/timestamp", function(req, res){
   var date = new Date()
     res.json({
    "unix": date.valueOf(),
    "utc": date.toUTCString()
  });
})


app.get("/api/timestamp/:dateString", function (req, res) {
  let dateString = req.params.dateString;

  if (isNumericString(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  if (date.toString() === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    });
  }
});

function isNumericString(string) {
  const numericCharacters = "0123456789";
  for (let i = 0; i < string.length; i++) {
    if (!numericCharacters.includes(string[i])) {
      return false;
    }
  }
  return true;
}





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
