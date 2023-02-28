const passport = require('passport');
const crypto = require('crypto');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');
passport.use(new GoogleStrategy({
    clientID: '200918686716-j1vvvhmchgla5hkc5ur6cvb60i5efg1f.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, cb){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error in google strategy-passport', err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user){
            // if found, set this user as req.user
            return cb(null, user);
        }else{
            // if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if (err){console.log('error in creating user google strategy-passport', err); return;}

                return cb(null, user);
            });
        }

    }); 
}


));
module.exports = passport;
