'use strict'

require('dotenv').config();
const Snoowrap = require('snoowrap');
const {CommentStream} = require('snoostorm');

const client = new Snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

// check bot start time in seconds (reddit does not like miliseconds)
const BOT_START = Date.now() / 1000;

const comments = new CommentStream(client, {
  subreddit: 'testingground4bots',
  limit: 10,
  pollTime: 10000
});

comments.on('item', (item) => {
  if(item.created_utc < BOT_START) return;
  console.log(item);
});