// config/passport.js

// load all the things we need

//const config = require("../config_server");
var bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
// load up the user model
//const couchbase = require('couchbase');
//const db = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
const User = require("../models/user");
// expose this function to our app using module.exports
module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.getById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) { // callback with email and password from our form
            User.getById(username, function (err, userb) {
                if (err)
                    return done(err);
                // if no user is found, return the message
                if (!userb)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, userb.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, userb);
            })
        }));
};
