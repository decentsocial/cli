const test = require('ava')
const { getTweets, multi } = require('./tweets')

test('gets user tweets', async t => {
  const tweets = await getTweets('christian_fei')
  t.true(tweets instanceof Array)
  t.true(tweets.length > 10)

  const tweet = tweets[0]
  t.truthy(tweet.author)
  t.truthy(tweet.authorLink)
  t.truthy(tweet.authorAvatar)
  t.truthy(tweet.rss)
  t.truthy(tweet.bio)
  t.truthy(tweet.text)
  t.truthy(tweet.html)
  t.truthy(tweet.date)
  t.truthy(tweet.link)
})

test('gets multiple users tweets', async t => {
  const tweets = await multi(['elonmusk', 'lexfridman'])
  t.true(tweets instanceof Array)
  t.true(tweets.length > 20)

  const tweet = tweets[0]
  t.truthy(tweet.author)
  t.truthy(tweet.authorLink)
  t.truthy(tweet.authorAvatar)
  t.truthy(tweet.rss)
  t.truthy(tweet.bio)
  t.truthy(tweet.text)
  t.truthy(tweet.html)
  t.truthy(tweet.date)
  t.truthy(tweet.link)
})
