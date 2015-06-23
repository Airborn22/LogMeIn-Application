/*jslint node: true, indent: 2 */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';
var superagent = require('superagent');
var expect = require('expect.js');

/**
 * Test for the REST API
 */
describe('api test', function(){
  // Test the occupation autocomplete with an empty string
  it('occupation autocomplate empty', function(done){
    superagent.get('http://localhost:8888/v1/occupation/')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(typeof response.body).to.eql('object');

        done();
      });
  });

  // Test the occupation autocomplete with "a"
  it('occupation autocomplate "a"', function(done){
    superagent.get('http://localhost:8888/v1/occupation/a')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(typeof response.body).to.eql('object');

        done();
      });
  });
});
