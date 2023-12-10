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
let demoDate = new Date(demoDateString); // invalid date

let demoDateString2 = '2015-12-25';
let demoDate2 = new Date(demoDateString2); // success

let demoDateNo3= 1451001600000;
let demoDate3 = new Date(demoDateNo3); // success

if (demoDate.valueOf() == demoDate2.valueOf())
{
  console.log('true');
}
else 
{
  console.log('false');
}

if (isNaN(demoDate.valueOf()))
  { console.log("\t>>NaN test passed");}
if (Number.isNaN(demoDate.valueOf()))
  { console.log("\t>>NaN number test passed");}
if (demoDate.toString() == "Invalid Date")
  { console.log("\t>>string test passed");}

if (isNaN(demoDate2.valueOf()))
  { console.log("\t>>NaN test false positive");}
if (Number.isNaN(demoDate2.valueOf()))
  { console.log("\t>>NaN number test false positive");}
if (demoDate2.toString() == "Invalid Date")
  { console.log("\t>>string test false positive");}

  console.log('value: ' + demoDate.valueOf());
  console.log('string: ' + demoDate.toString());
  console.log('direct: ' + demoDate);

  console.log('2value: ' + demoDate2.valueOf());
  console.log('2string: ' + demoDate2.toString());
  console.log('2direct: ' + demoDate2);
  
if (demoDate == new Date('xyz'))
  { console.log("\t>>known invalid date object test passed");}

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

    // if no date parameter present, return current time
    if (!req.params.date) 
    {
      thisDate = new Date();
    }
    // if date parameter present, process it
    else
    {
      let dateInput = req.params.date.toString();
  
      // if dateInput is a number, then we handle it as number not string
      if (!isNaN(dateInput)) 
      {
        dateInput = parseInt(dateInput);
      }
  
      // attempt to create a date from this string
      thisDate = new Date(dateInput);
  
      // this will catch an invalid date and return a response
      if (isNaN(thisDate.valueOf())) {
        res.json({"error" : "Invalid Date"});
        return;
      }
    }

    // for an empty or a valid date, this will return a response
    res.json({"unix": thisDate[Symbol.toPrimitive]('number'),
      "utc" : thisDate.toUTCString()});
    return;
  }

  catch (error) {
    // catch and log any errors encountered above and return error message
    // this should be different to "invalid date" because that shouldn't reach here
    console.log(error);
    res.json({"error" : "Server Error-a"});
    return;
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
