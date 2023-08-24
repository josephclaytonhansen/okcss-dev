import passport from 'passport'
import User from './models/userModel.min.js'
import googleAuthenticator from 'passport-2fa-totp'
import Strategy from 'passport-2fa-totp'

passport.use(new Strategy(function (username, password, done) {
    // 1st step verification: username and password
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        if (!user.verifyPassword(password)) { return done(null, false) }
        return done(null, user)
    });
}, function (user, done) {
    // 2nd step verification: TOTP code from Google Authenticator
    if (!user.secret) {
        googleAuthenticator.generateSecret({ name: "Blog Front End Editor", account: user.username }, function (err, secret) {
            if (err) { return done(err) }
            user.secret = secret
            user.save(function (err) {
                if (err) { return done(err) }
                var otpauth = googleAuthenticator.generateOtpauthUrl({ secret: secret, label: "Blog Front End Editor", account: user.username })
                done(null, otpauth)
            })
        })
    } else {
        var secret = googleAuthenticator.decodeSecret(user.secret)
        done(null, secret, 30)
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})