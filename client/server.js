const FitbitApiClient = require("fitbit-node");
const express = require("express");
const rp = require("request-promise");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const config = require("../config.js");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");

const { join } = require("path");
const app = express();

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://localhost/.well-known/jwks.json`
//   }),

//   audience: authConfig.audience,
//   issuer: `https://localhost/`,
//   algorithm: ["RS256"]
// });

const dataServiceEndpoint = `http://${config.dataServiceUri}:${
  config.dataServicePort
}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/certs/server.key", "utf8"),
      cert: fs.readFileSync(__dirname + "/certs/server.cert", "utf8")
    },
    app
  )
  .listen(443);
