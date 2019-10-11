// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', getTimestamp);
app.get('/api/timestamp/:date_string', getTimestamp);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// return json timestap for the task
function getTimestamp(req, res) {
  const dateString = req.params.date_string;
  const date = dateString ? new Date(dateString) : new Date();

  if (date instanceof Date)
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  else
    res.json({ "unix": null, "utc": "Invalid Date" });
}
