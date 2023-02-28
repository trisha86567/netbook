const passport = require('passport');
const User = require('../models/users');
const crypto = require('crypto');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "200918686716-ck25s95oluaintk8qhhecp13ur7ccpsi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
   

    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        console.log(accessToken, refreshToken, profile);
        if(err){
            console.log(err);
            return
        }
        //NO USER PRESET, ID CREATE
        //LOG IN 
        if(user){
            return cb(null, user)
        } else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }),function(err,user){
                if(err){
                    console.log(err);
                    return
                }
                return cb(null,user)
            }
        }

    })
    

  }
));

module.exports = passport;