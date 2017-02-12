'use strict';

const co = require('co');
const expect = require('chai').expect;

const testDataUnauthorized = require('./_data/unauthorized.json');

const Storyblok = require('../index');

describe('# Integration', () => {

  it('should get "Unauthorized" on false public key', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ public: 'unauthorized_key' });

    let response = yield storyblokInstance.getStory('testStory');

    expect(response).to.deep.equal(testDataUnauthorized);
  }));

  it('should throw error on invalid api request', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ public: 'unauthorized_key' }, 'http://invalid.endpoint');

    let error;

    try {
      yield storyblokInstance.getStory('testStory');
    } catch (e) {
      error = e;
    }

    expect(error).to.be.an.instanceof(Error);
  }));

});
