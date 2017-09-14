//var bcrypt = require("bcryptjs");
//var UserModel = require("../models/user");
//var CompanyModel = require("../models/company");

var appRouter = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Express',user: req.user});
    });
    app.get('/pos', function (req, res, next) {
        res.render('pos', {title: 'POS',user: req.user});
    });
    app.get('/pay', function (req, res, next) {
        res.render('pay', {title: 'PAY',user: req.user});
    });
};

module.exports = appRouter;
