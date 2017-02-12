'use strict';

const co = require('co');
const expect = require('chai').expect;
const jsonServer = require('json-server');

const testDataStory = require('./_data/story.json');
const testDataNotFound = require('./_data/notFound.json');
const testDataUnauthorized = require('./_data/unauthorized.json');
const testServerPort = 13370;
const testServerEndpoint = `http://localhost:${testServerPort}/`;

const Storyblok = require('../index');

describe('# Storyblok', () => {
  let testServer;

  before((next) => {
    testServer = jsonServer.create();

    testServer.use((request, response, next) => {
      switch (request.query.token) {
        case 'public_key':
        case 'private_key':
          next();
          break;
        default:
          response.status(401).json(testDataUnauthorized);
          break;
      }
    });

    testServer.get('/v1/cdn/stories/testStory', (request, response) => {
      response.json(testDataStory);
    });

    testServer.use((request, response) => {
      response.status(404).json(testDataNotFound);
    });

    testServer.listen(testServerPort, next);
  });

  it('should get a story by its slug', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ public: 'public_key' }, testServerEndpoint);

    let response = yield storyblokInstance.getStory('testStory');

    expect(response).to.deep.equal(testDataStory);
  }));

  it('should get a story draft by its slug', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ private: 'private_key' }, testServerEndpoint);

    let response = yield storyblokInstance.getStory('testStory', Storyblok.MODE_DRAFT);

    expect(response).to.deep.equal(testDataStory);
  }));

  it('should respond with "Not found" if slug not found', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ public: 'public_key' }, testServerEndpoint);

    let response = yield storyblokInstance.getStory('testStoryNotFound');

    expect(response).to.deep.equal(testDataNotFound);
  }));

  it('should respond with "Unauthorized" on false public key', co.wrap(function* () {
    let storyblokInstance = new Storyblok({ public: 'unauthorized_key' }, testServerEndpoint);

    let response = yield storyblokInstance.getStory('testStory');

    expect(response).to.deep.equal(testDataUnauthorized);
  }));

});
