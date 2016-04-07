
var express = require('express');
var ejs = require('ejs');
var compression = require('compression');

var wines = require('./routes/employee');

// Release version
var RELEASE = 'build';
//var RELEASE = 'dist';

var server = express();
server.engine('html', ejs.renderFile);
server.set('views', __dirname + '/' + RELEASE);

// Quick helper functions
function pad(n) {
    return (n < 10) ? ('0' + n) : n;
}
function printTimeNow() {
    var dt = new Date();
    return '[' + pad(dt.getHours()) + ':' + pad(dt.getMinutes()) + ':' + pad(dt.getSeconds()) + '] ';
}

// Create a logging callback, so we log every resource request.
server.use(function (req, res, next) {
    console.log(printTimeNow() + req.method + ' --> ' + req.url);
    next();
});

// Compress our responses.
server.use(compression());

// And serve up our pages when requested, using the build directory as the 
// base.
server.use(express.static(__dirname + '/' + RELEASE));

// Handle 404 errors (page not found)
server.use(function (req, res) {
    console.log(printTimeNow() + 'ERROR: resource not found.');
    res.status(404);
    // Respond with HTML if possible
    if (req.accepts('html')) {
        res.render('404.html', { title: '404: Page Not Found' });
    }
    // Otherwise, if possible, use JSON
    else if (req.accepts('json')) {
        res.send({error: 'Not found'});
    }
    // Otherwise default to plain text
    else {
        res.type('txt').send('Not found');
    }
});

server.get('/employees', wines.findAll);

// Define the port we will bind to
var port = 8000;
// And start listening to it.
server.listen(port, function () {
    console.log(printTimeNow() + 'Server listening on port ' + port + ' (' + RELEASE + ')');
});
