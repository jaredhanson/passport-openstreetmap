var vows = require('vows');
var assert = require('assert');
var util = require('util');
var openstreetmap = require('passport-openstreetmap');


vows.describe('passport-openstreetmap').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(openstreetmap.version);
    },
  },
  
}).export(module);
