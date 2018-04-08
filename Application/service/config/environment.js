module.exports = function (app, express) {

    // MAIN PIPELINE
    // ==================================================
    app.configure(function () {
        
    });

    // DEV PIPELINE (uses the NODE_ENV environment variable)
    // ==================================================
    app.configure('dev', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // QA PIPELINE (uses the NODE_ENV environment variable)
    // ==================================================
    app.configure('qa', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // PROD PIPELINE (uses the NODE_ENV environment variable)
    // ==================================================
    app.configure('prod', function () {
        app.use(express.errorHandler());
    });

};