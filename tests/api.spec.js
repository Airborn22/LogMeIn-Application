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
    superagent.get('http://localhost:8888/v1/occupation/').accept('application/json')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response.body).to.be.an('array');
        expect(response.body).to.eql([
          'Application analyst',
          'Computer operator',
          'Computer repair technician',
          'Computer scientist',
          'Computer analyst',
          'Data entry clerk',
          'Database administrator',
          'Data analyst',
          'Data scientist',
          'Network analyst',
          'Network administrator',
          'Programmer',
          'Security engineer'
        ]);

        done();
      });
  });

  // Test the occupation autocomplete with "c"
  it('occupation autocomplate "a"', function(done){
    superagent.get('http://localhost:8888/v1/occupation/a').accept('application/json')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response.body).to.be.an('array');
        expect(response.body).to.eql([
          'Computer operator',
          'Computer repair technician',
          'Computer scientist',
          'Computer analyst'
        ]);

        done();
      });
  });
});
