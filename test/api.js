const request = require('request');
const expect = require('chai').expect;

// const { killApp, findPort, launchApp } = require('next-test-utils');
// import {
//   killApp,
//   findPort,
//   launchApp
// } from 'next/next-test-utils';
//
// let appPort;
// let server;

describe('get routes', function() {

  // before(function() {
  //   boot()
  // })
  //
  // beforeAll(async () => {
  //   appPort = await findPort()
  //   server = await launchApp(appDir, appPort)
  // })
  // afterAll(() => killApp(server))

  it('should get posts', function(done) {
    request.get('http://localhost:3000/api/posts', function(err, res, body) {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(200);
      // expect(res.body).to.equal('{"name":"test2"}');
      done();
    });
  });
});
