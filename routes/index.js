//var bcrypt = require("bcryptjs");
//var UserModel = require("../models/user");
//var CompanyModel = require("../models/company");

var appRouter = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Express',user: req.user});
    });
};

module.exports = appRouter;
