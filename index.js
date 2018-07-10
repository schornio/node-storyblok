'use strict';

const API_ENDPOINT_DEFAULT = 'https://api.storyblok.com/';

const url = require('url');
const apiRequest = require('./src/apiRequest');

class Storyblok {

  constructor(tokens, endpoint) {

    if (!endpoint) {

      endpoint = API_ENDPOINT_DEFAULT;

    }

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

  _defaultOptions (options) {

    if (!options.version) {

      options.version = Storyblok.MODE_PUBLISHED;

    }

    if (!options.token) {

      options.token = this.getToken(options.version);

    }

    return options;

  }

  getStory (id, options) {

    let requestUrl = url.parse(`${this.endpoint}v1/cdn/stories/${id}`, true);
    let requestOptions = this._defaultOptions({ ...options });

    requestUrl.query = requestOptions;

    return apiRequest(requestUrl);
  }

  getStories (options) {

    let requestUrl = url.parse(`${this.endpoint}v1/cdn/stories`, true);
    let requestOptions = this._defaultOptions({ ...options });

    requestUrl.query = requestOptions;

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
