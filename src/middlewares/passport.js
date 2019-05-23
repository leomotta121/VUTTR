const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user');
const secret = require('../scretOrKey').secret;

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.use(
    new Strategy(opts, async function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
