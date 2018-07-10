# node-storyblok

![Build Status](https://travis-ci.org/schornio/node-storyblok.svg?branch=master)

## Install

```
npm i node-storyblok
```

## Usage

### Class `Storyblok`

**Parameters**

- `tokens` Object, `public` and `private` token
- (`endpoint` if using a seperate Storyblok API instance)

**Example**

```javascript
const Storyblok = require('node-storyblok');
let sb = new Storyblok({ public: 'public_key_here' });
```

### Method `Storyblok#getStory`

**Parameters**
- `[return]` Promise, Object `story`
- `id` String, story-id
- `options` Object
  - `version` String, default: `Storyblok.MODE_PUBLISHED`

**Example**

```javascript
let sb = new Storyblok({ public: 'public_key_here' });
sb.getStory('home')
  .then((response) => {
    response.story;
  });
```

### Method `Storyblok#getStories`

**Parameters**

- `[return]` Promise, Array `stories`
- `options` Object
  - `version` String, default: `Storyblok.MODE_PUBLISHED`

**Example**

```javascript
let sb = new Storyblok({ public: 'public_key_here' });
sb.getStories()
  .then((response) => {
    response.stories;
  });
```

## Contribution

Fork me on [Github](https://github.com/schornio/node-storyblok)
