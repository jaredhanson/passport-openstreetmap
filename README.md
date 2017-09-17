# Passport-OpenStreetMap

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [OpenStreetMap](http://www.openstreetmap.org/) using the OAuth 1.0a API.

This module lets you authenticate using OpenStreetMap in your Node.js applications.
By plugging into Passport, OpenStreetMap authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-openstreetmap

## Usage

#### Configure Strategy

The OpenStreetMap authentication strategy authenticates users using an
OpenStreetMap account and OAuth tokens.  The strategy requires a `verify`
callback, which accepts these credentials and calls `done` providing a user, as
well as `options` specifying a consumer key, consumer secret, and callback URL.

    passport.use(new OpenStreetMapStrategy({
        consumerKey: OPENSTREETMAP_CONSUMER_KEY,
        consumerSecret: OPENSTREETMAP_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/openstreetmap/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ openstreetmapId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'openstreetmap'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/openstreetmap',
      passport.authenticate('openstreetmap'));

    app.get('/auth/openstreetmap/callback', 
      passport.authenticate('openstreetmap', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-openstreetmap/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-openstreetmap.png)](http://travis-ci.org/jaredhanson/passport-openstreetmap)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-openstreetmap'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-openstreetmap.svg' /></a>
