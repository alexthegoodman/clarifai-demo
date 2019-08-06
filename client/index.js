const express = require("express");
const rp = require("request-promise");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

const serverIP = "localhost";

app.get("/", function(req, res) {
  res.sendFile(
    path.join(path.normalize(__dirname + "/..") + "/client/public/index.html")
  );
});

// // launch the server
https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/certs/server.key", "utf8"),
      cert: fs.readFileSync(__dirname + "/certs/server.cert", "utf8")
    },
    app
  )
  .listen(443);

app.listen(80);
