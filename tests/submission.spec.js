/*jslint node: true, indent: 2 */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';
var superagent = require('superagent');
var expect = require('expect.js');

/**
 * Test for the form submission
 */
describe('Form Submission Test', function(){
  // Test the form submission with valid data
  it('Valid form submission', function(done){
    superagent.post('http://localhost:8888/v1/submission/')
      .send({
        name: 'Sandor Major',
        email: 'airborn22@gmail.com',
        occupation: 'Programmer',
        birthday: '1989-03-22'
      })
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response.body).to.be.an('object');
        expect(response.body.success).to.eql(true);

        done();
      });
  });
});
