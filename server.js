/* Module dependencies:
 *
 * require() loads a nodejs "module" - basically a file.  Anything
 * exported from that file (with "exports") can now be dotted off
 * the value returned by require(), in this case e.g. eatz.api
 * The convention is use the same name for variable and module.
 */

"use strict;"
var https = require('https'),   // ADD CODE
    // NOTE, use the version of "express" linked to the assignment handout
    express = require('express'), // Express Web framework   ... ADD CODE
    fs = require("fs"),
    http = require('http'),
    config = require("./config"); 
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var errorHandler = require('errorhandler');    
var eatz = require('./routes/eatz');

var app = express();  // Create Express app server

// all environments
app.set('httpsport', process.env.PORT || config.httpsport);
app.set('httpport', process.env.PORT || config.httpport);
app.use(logger('dev'));
app.use(session({resave: true,
                  saveUninitialized: true,
                  key: config.sessionKey,
				  secret: config.sessionSecret,
                  cookie: {maxAge:config.sessionTimeout} }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', eatz.api);
app.use(function(req, res, next) {
    res.status(404).send('Can you check your URL?');
});

var options = {
  key: fs.readFileSync('key.pem'),  // RSA private-key
  cert: fs.readFileSync('cert.pem')  // RSA public-key certificat
};

app.listen(app.get('httpport'), function(){
    console.log('Express server listening on port ' + app.get('httpport'));
});

https.createServer(options, app).listen(app.get('httpsport'), function(){
  console.log('Express server listening on port ' + app.get('httpsport'));
});

