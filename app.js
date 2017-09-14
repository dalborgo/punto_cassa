var express = require("express");
var logger = require('morgan');
var debug = require('debug')('http:couch');
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var ejs = require('ejs');
var ottoman = require("ottoman");
var passport = require('passport');
var path = require("path");
var config = require("./config/config.json");
var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
const assets = require('connect-assets');
app.use(assets({
        helperContext: app.locals,
        paths: ['public/stylesheets', 'public/javascripts', 'public/images']
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const CouchbaseStore = require('connect-couchbase')(session);
const couchbaseStore = new CouchbaseStore({
    bucket: config.couchbase.bucket,               //optional
    host: config.couchbase.server,          //optional
    prefix: 'sess|'
});

app.use(session({
    store: couchbaseStore,
    secret: 'your secret',
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true //stay open for 1 day of inactivity
}));

var myBucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);
module.exports.store = new ottoman.CbStoreAdapter(myBucket, couchbase);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
couchbaseStore.on('connect', function () {
    debug("Couchbase Session store is ready for use");
});
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

require("./config/passport")(passport);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var user = require("./routes/user.js")(app);
var index = require("./routes/index.js")(app);
var print = require("./routes/print.js")(app);
var secure = require("./routes/secure.js")(app, passport);

ottoman.store = module.exports.store;
var UserModel = require("./models/user");

ottoman.ensureIndices(function (error) {
    if (error) {
        console.log(error);
    }
    var server = app.listen(3000, function () {
        console.log("Listening on port %s...", server.address().port);
    });

});
