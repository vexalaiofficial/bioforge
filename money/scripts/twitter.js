#!/usr/bin/env node
/**
 * Vexal AI - Twitter Automation
 * Uses twitter-lite to post content
 */

const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(process.env.HOME || '/Users/vexalai', '.openclaw/openclaw.json');
let config = {};

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch(e) {
  console.log('No config, using env vars');
}

const twitterCreds = config.twitter || process.env;

async function postTweet(status) {
  tryLite = require('twitter {
    const twitter-lite');
    
    const client = new twitterLite({
      consumer_key: twitterCreds.consumer_key || twitterCreds.apiKey,
      consumer_secret: twitterCreds.consumer_secret || twitterCreds.apiSecret,
      access_token_key: twitterCreds.access_token_key || twitterCreds.accessToken,
      access_token_secret: twitterCreds.access_token_secret || twitterCreds.accessTokenSecret
    });
    
    const result = await client.post('statuses/update', { status });
    console.log('Posted:', result.text);
    return result;
  } catch(e) {
    console.error('Twitter error:', e.message);
    return null;
  }
}

// CLI handler
const args = process.argv.slice(2);
if (args[0] === 'post' && args[1]) {
  postTweet(args.slice(1).join(' '));
}

module.exports = { postTweet };
