// INIT
// =============================================================================
var express = require('express');
var app = express();
const mongoose = require('mongoose');

// CREATE CONFIG
// =============================================================================
var websiteRootPath = 'website';
var rollbarKey = "";
var rollbarEnv = "development";


// SETUP ENV VARS
// =============================================================================
var envVars = require('./service/common/envVars');
envVars.setValue('CONNECTIONSTRING', 'mongodb://127.0.0.1:27017/kabooslite');
envVars.setValue('PORT', 8080);
envVars.setValue('SESSIONPASS', 'KABOOS-SECRET-CHANGEME');
envVars.setValue('SMTPHOST', 'localhost');
envVars.setValue('SMTPFROM', 'noreply@someemaildomain.com');
envVars.setValue('SMTPUSER', 'Mailout-KaboosLite');
envVars.setValue('SMTPPASS', '');
envVars.setValue('SMTPPORT', '25');
envVars.setValue('SMTPTEMPLATEPATH', __dirname + '\\templates');


// BASE PACKAGE SETUP
// =============================================================================
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var path = require('path');
var open = require('open');
var rollbar = require("rollbar");
var shortid = require("shortid");
var dash = require("nodejs-dashboard");
var mailer = require('express-mailer');


// GLOBAL VARIABLES
// =============================================================================
global.appRoot = path.resolve(__dirname + "\\Service");


// JS FILE INCLUDES
// =============================================================================
var controllers = require('./service/controllers/_index');
var logMiddleware = require('./service/middlewares/logging');
var autMiddlewareh = require('./service/middlewares/auth');
var utils = require('./service/common/utils');
var seeder = require('./service/data/seeder/seeder');


// DISPLAY MODULES
// =============================================================================
console.log('=========================================');
console.log('Server starting up...');
console.log('=========================================');
console.log('- Load Controllers -> ' + (typeof controllers === "function"));
console.log('- Load Utilities -> ' + (typeof utils === "object"));
console.log('- Load Logger -> ' + (typeof morgan === "function"));
console.log('- Load Id Generator -> ' + (typeof shortid === "function"));
console.log('- Load Logging Middleware -> ' + (typeof logMiddleware === "function"));
console.log('- Load Authentication Middleware -> ' + (typeof autMiddlewareh === "function"));
console.log('- Load Api Controllers -> ' + (typeof controllers === "function"));
console.log('- Load Session Storage -> ' + (typeof session === "function"));
console.log('- Load Seed Data Module -> ' + (typeof seedData === "object"));
console.log('- Load Mongo Session Module -> ' + (typeof mongoStore === "function"));
console.log('- Load Mongo Database Module -> ' + (typeof mongoose.connect === "function"));


// ERROR HANDLING
// ==================================================
// rollbar.init(rollbarKey, {
//   environment: rollbarEnv,
//   endpoint: "https://api.rollbar.com/api/1/"
// });
// app.use(function (err, req, res, next) {
//     console.log('!!! Found an error !!!');
//     rollbar.handleError(err);
// });

// SET THE MODULES
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler());

app.use(morgan('dev'));
app.use(session({
	secret: process.env.SESSIONPASS,
	saveUninitialized: false,
	resave: false,
	store: new mongoStore({
		url: process.env.CONNECTIONSTRING,
		autoRemove: 'interval',
		autoRemoveInterval: 120 // Minutes
	})
}));
app.use(express.static(path.join(__dirname, websiteRootPath)));
app.use(controllers);

// START THE SERVER
// =============================================================================
console.log('  -- Connecting...');
mongoose.connect(process.env.CONNECTIONSTRING, function (err, db) {
	if (err) {
		console.log('  -- Error Connecting -> ' + err);
		process.exit(1);
	}

	console.log('  -- Connected!');

	mongoose.connection.db.listCollections().toArray(function (err, names) {
		if (err) {
			console.log(err);
		}
		else {
			if (names.length == 0) {
				var seedDataLoc = path.join(__dirname, '\\service\\data\\seeds');
				seeder.runSeed(seedDataLoc);
			}
		}
	});

	// START THE PORT LISTENER
	// ============================================================================
	var server = app.listen(process.env.PORT, function () {
		// FINISHED AND LISTENING
		// =============================================================================
		console.log('=========================================');
		console.log('Website:   http://localhost:' + process.env.PORT + '/');
		console.log('API:       http://localhost:' + process.env.PORT + '/api/');
		console.log('=========================================');
		// open('http://localhost:' + port + '/');
	});
});
