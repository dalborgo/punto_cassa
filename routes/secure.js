//var bcrypt = require("bcryptjs");
//var UserModel = require("../models/user");
//var CompanyModel = require("../models/company");

var appRouter = function (app, passport) {
    app.get("/secure", function (req, res, next) {
        if (!req.user) {
            res.render("secure", {expressFlash: req.flash('loginMessage')});
        } else {
            res.redirect('/')
        }
    });

    app.post("/secure", passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/secure', // redirect back to the signup page if there is an error
        failureFlash: false // allow flash messages
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

module.exports = appRouter;
