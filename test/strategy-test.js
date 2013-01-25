var vows = require('vows');
var assert = require('assert');
var util = require('util');
var OpenStreetMapStrategy = require('passport-openstreetmap/strategy');


vows.describe('OpenStreetMapStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new OpenStreetMapStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named openstreetmap': function (strategy) {
      assert.equal(strategy.name, 'openstreetmap');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new OpenStreetMapStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        var body = '<osm version="0.6" generator="OpenStreetMap server"> \
          <user account_created="2012-01-10T22:01:09Z" display_name="jaredhanson" id="583771"> \
            <description></description> \
            <contributor-terms pd="false" agreed="true"/> \
            <languages> \
              <lang>en-US</lang> \
              <lang>en</lang> \
            </languages> \
          </user> \
        </osm> \
        ';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'openstreetmap');
        assert.equal(profile.id, '583771');
        assert.equal(profile.displayName, 'jaredhanson');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set xml2js property' : function(err, profile) {
        assert.isObject(profile._xml2js);
        assert.strictEqual(profile._xml2json, profile._xml2js);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new OpenStreetMapStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        callback(new Error('something went wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },

}).export(module);
