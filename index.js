'use strict';

const API_ENDPOINT_DEFAULT = 'https://api.storyblok.com/';

const url = require('url');
const apiRequest = require('./src/apiRequest');

class Storyblok {

  constructor(tokens, endpoint) {
    if (!endpoint) { endpoint = API_ENDPOINT_DEFAULT; }

    this.publicToken = tokens.public;
    this.privateToken = tokens.private;
    this.endpoint = endpoint;
  }

  static get MODE_DRAFT () {
    return 'draft';
  }

  static get MODE_PUBLISHED () {
    return 'published';
  }

  getStory (slug, version) {
    if (!version) { version = 'published'; }

    let requestUrl = url.parse(`${this.endpoint}v1/cdn/stories/${slug}`, true);

    requestUrl.query.version = version;
    requestUrl.query.token = this.getToken(version);

    return apiRequest(requestUrl);
  }

  getStories (options) {
    if (!options) { options = {}; }
    let version = options.version;
    if (!version) { version = 'published'; }

    let requestUrl = url.parse(`${this.endpoint}v1/cdn/stories`, true);

    requestUrl.query.version = version;
    requestUrl.query.token = this.getToken(version);

    return apiRequest(requestUrl);
  }

  getToken (version) {
    switch (version) {
      case Storyblok.MODE_PUBLISHED:
        return this.publicToken;
      case Storyblok.MODE_DRAFT:
        return this.privateToken;
    }
  }
}

module.exports = Storyblok;
