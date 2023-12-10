// index.js
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

// ----- TEST -----

let demoDateString = '1451001600000';
let demoDate = new Date(demoDateString);

let demoDateString2 = '2015-12-25';
let demoDate2 = new Date(demoDateString2);

let demoDateNo3= 1451001600000;
let demoDate3 = new Date(demoDateNo3);

if (demoDate.valueOf() == demoDate2.valueOf())
{
  console.log('true');
}
else 
{
  console.log('false');
}

console.log({"unix": demoDate2[Symbol.toPrimitive]('number'),
"utc" : demoDate2.toUTCString()});

// ---- END-TEST -----

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// :date
app.get("/api/:date?", (req, res) => {

  let thisDate;

  try {
    let dateInput = req.params.date.toString();
    if (dateInput = '') {
      dateInput = new Date();
    }

    if (!isNaN(dateInput)) 
    {
      dateInput = parseInt(dateInput);
    }

    thisDate = new Date(dateInput);
    // Code to execute if the line above doesn't throw an error
    if (thisDate.valueOf() == NaN) {
      res.json({"error" : "Invalid Date"});
      return;
    }
  } catch (error) {
    // Code to handle the error
    console.log(error);
  }

  res.json({"unix": thisDate[Symbol.toPrimitive]('number'),
    "utc" : thisDate.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
