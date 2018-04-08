var express = require('express')
  , router = express.Router()
  , morgan = require('morgan')
  , logger = morgan('combined')

// SUCCESSFUL CALLS
// ==================================================
router.use(function (req, res, next) {
    // console.log('= Request -> ' + req.method + ': ' + req.originalUrl);
    // var bodyStr = JSON.stringify(req.body);
    // if (bodyStr != '{}') {
    //     console.log('  == Body -> ' + JSON.stringify(req.body));
    // }
    // console.log('-------------------------------------------------');
    next();
});

// ERROR HANDLING
// ==================================================
router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('= Error on -> ' + req.method + ': ' + req.originalUrl);
});

module.exports = router;
