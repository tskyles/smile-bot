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

// set up comment stream from /r/all every 2.5 seconds
const comments = new CommentStream(client, {
  subreddit: 'testingground4bots',
  pollTime: 2500
});

const getDate = (time) => {
  const date = new Date(time * 1000).toLocaleString();
  return date;
};

let commentCount = 0;
comments.on('item', (item) => {
  let replyCount = 0;
  const frownRegex = /:\(/;
  if(frownRegex.test(item.body) === true && item.author.name !== 'smile-bot-2019'){
    item.reply(`I noticed one of these... :( \n\n\n\n So here take this... :D`);
    replyCount++;
    console.log(replyCount);
  };
  if(item.author.name === 'smile-bot-2019'){
    console.log('my reply', item.author.name, item.body);
  };

  // check creation time of comment
  console.log('time created', getDate(item.created_utc));

  // count number of comments parsed since bot started
  commentCount++;
  console.log('comments viewed', commentCount);

});

