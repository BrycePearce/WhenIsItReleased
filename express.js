const path = require('path');
const express = require('express');
const app = express();

//set port (local environment variable is set as PORT=80)
app.set('port', process.env.PORT || 8080);

//Sets root folder
app.use("/", express.static(path.resolve(__dirname, 'build/')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});