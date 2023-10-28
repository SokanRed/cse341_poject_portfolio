const mongodb = require("../db/connect");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

module.exports = function(passport) {
        passport.use(
            new GoogleStrategy({
                // option for the google start
                callbackURL: '/auth/google/redirect',
                clientID: keys.google.clientID,
                clientSecret: keys.google.clientSecret
            }, async(accessToken, refreshToken, profile, done) => {
                try {
                    const user = await mongodb
                        .getDb()
                        .db('portfolio-builder')
                        .collection("users")
                        .find({ googleId: profile.id })
                        .toArray();
                    if (user.length === 0) {
                        let newUser = {
                            userName: profile.displayName,
                            googleId: profile.id
                        }
                        await mongodb
                            .getDb()
                            .db('portfolio-builder')
                            .collection("users")
                            .insertOne(newUser);
                        done(null, newUser)
                    } else {
                        done(null, user)
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: "An error occurred while retrieving the user." });
                }
            }))
        passport.serializeUser(function(user, cb) {
            process.nextTick(function() {
                cb(null, { id: user.id, username: user.username, name: user.displayName });
            });
        });

        passport.deserializeUser(function(user, cb) {
            process.nextTick(function() {
                return cb(null, user);
            });
        });
    }
    // passport callback function
    //         console.log('passport callback function fired');
    //         console.log(profile);
    //         new User({
    //             userName: profile.displayName,
    //             googleId: profile.id
    //         }).save().then(async(newUser) => {
    //             await User.create(newUser);
    //             console.log('new user created:' + newUser);
    //         })
    //     )