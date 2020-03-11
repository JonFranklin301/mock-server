const express = require('express');
const package = require('./package.json');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const program = require('commander');
const prettyjson = require('prettyjson');
require('node-json-color-stringify');

// Commander - setup command-line args
program
  .name(package.name)
  .version(package.version)
  .option('-p, --port <number>', 'port to run mock-server on', 5555)
  .option('-j, --json', 'output data in json format', false)
  .option('-c, --nocolor', 'do not use colors', false)
  .parse(process.argv);

// Commander - output help info
program.outputHelp();

// Create app
var app = express();

// Add request time in
app.use(function(req, res, next) {
  req.requestTime = moment();
  next();
});
// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Capture all methods to all routes
app.all('*', function(req, res, next) {
  const responseTime = moment();
  const ip = req.ip ? req.ip : req.connection.remoteAddress;
  const requestLog = {
    requestTime: req.requestTime.toISOString(),
    responseTime: responseTime.toISOString(),
    remoteAddress: ip,
    method: req.method,
    httpVersion: req.httpVersion,
    originalUrl: req.originalUrl,
    pathName: req._parsedUrl.pathname,
    queryString: req._parsedUrl.query,
    query: req.query,
    headers: req.headers
  };

  res.send('OK');

  console.log('\n============================================');

  if (program.json === true && program.nocolor === false) {
    // JSON with color
    console.log(JSON.colorStringify(requestLog, null, 2));
  } else if (program.json === true && program.nocolor === true) {
    // JSON with no color
    console.log(JSON.stringify(requestLog, null, 2));
  } else {
    // Pretty print with/without color
    console.log(
      prettyjson.render(requestLog, {
        noColor: program.nocolor
      })
    );
  }
});

// export the express app and program (command-line options)
module.exports = { app, program };
