# Twitter Skill - Vexal AI

Post tweets, reply, and engage on Twitter/X using the API.

## Setup
Credentials stored in `~/.openclaw/openclaw.json` under `twitter` key.

## Commands

### Post a tweet
```javascript
const twitter = require('twitter-lite');
const config = require('~/.openclaw/openclaw.json');

const client = new twitter({
  consumer_key: config.twitter.apiKey,
  consumer_secret: config.twitter.apiSecret,
  access_token_key: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
});

// Post tweet
client.post('statuses/update', { status: 'Hello world!' })
  .then(result => console.log(result))
  .catch(console.error);
```

### Reply to a tweet
```javascript
client.post('statuses/update', { 
  status: '@username reply text',
  in_reply_to_status_id: 'tweet_id_to_reply_to'
})
```

### Get mentions
```javascript
client.get('statuses/mentions_timeline', { count: 10 })
```

### Like a tweet
```javascript
client.post('favorites/create', { id: 'tweet_id' })
```

### Retweet
```javascript
client.post('statuses/retweet/:id', { id: 'tweet_id' })
```

## Environment
- Node.js with twitter-lite package
- Install: `npm install twitter-lite`
