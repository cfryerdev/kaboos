var express = require('express');
var app = express();
var cons = require('consolidate');
var mailer = require('express-mailer');
var utils = require('../common/utils');

// https://github.com/RGBboy/express-mailer

// RENDERER SETUP
// =============================================================================
app.engine('html', cons.swig);
app.set('views', process.env.SMTPTEMPLATEPATH);
app.set('view engine', 'html');

// EMAIL SETUP
// =============================================================================
mailer.extend(app, {
  from: process.env.SMTPFROM,
  host: process.env.SMTPHOST,
  secureConnection: false,
  port: process.env.SMTPPORT,
  transportMethod: 'SMTP',
  auth: {
    user: process.env.SMTPUSER,
    pass: process.env.SMTPPASS
  }
});


// HOISTING
// =============================================================================
module.exports = {
  sendMailByTemplate: sendMailByTemplate,
  sendMailByString: sendMailByString
};


// PRIVATE FUNCTIONS
// =============================================================================

function sendMailByTemplate(template, templateProperties, to, subject, callback) {
  var options = {
    to: to,
    subject: subject
  };

  if (utils.isDefined(templateProperties) && utils.isArray(templateProperties)) {
    utils.forEach(templateProperties, function (prop) {
      options[prop.key] = prop.value;
    });
  }

  app.mailer.send(template, options, callback);
}

function sendMailByString(content, to, subject, callback) {
  var options = {
    to: to,
    subject: subject,
    html: content
  };

  app.mailer.send(options, callback);
}
