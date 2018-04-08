var express = require('express')
 , router = express.Router()
 , utils = require('../common/utils')
 , session = require('express-session');

router.use(function (req, res, next) {
    if (req.session && req.session.user && req.session.user.isAuthenticated) {
        return next();
    }
    res.status(401).send({ message: 'You dont have permission to view this.', type: 'authentication' });
});

module.exports = router;
