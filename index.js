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
