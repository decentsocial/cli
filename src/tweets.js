const FeedParser = require('feedparser')
const fetch = require('node-fetch')
const limit = require('p-limit')(10)
const retry = require('p-retry')

module.exports = {
  getTweets,
  getTweetsForUser
}

async function getTweets (usernames = [], spinner) {
  const tweetsByUser = await Promise.all(usernames.map((url) => limit(() => retry(() => {
    return getTweetsForUser(url, spinner)
      .catch(err => {
        process.env.DEBUG && console.error(`an error occurred while fetching ${url}`, err.message)
        process.env.DEBUG && console.error(err)
        throw new Error(err)
      })
  }, { attempts: 2 }))))
  return tweetsByUser
    .reduce((acc, curr) => acc.concat(curr), [])
}
async function getTweetsForUser (username = '', spinner) {
  const url = username.startsWith('https') ? username : `https://nitter.decent.social/${username}/rss`
  spinner && (spinner.text = `loading ${url}`)

  const req = await fetch(url, {
    'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/${+Math.random() * 1000}.36 (KHTML, like Gecko) Chrome/31.0.${+Math.random() * 1000}.63 Safari/${+Math.random() * 1000}.36`,
    accept: 'application/json'
  })
  const feedparser = new FeedParser()

  if (req.status !== 200) {
    throw new retry.AbortError(req.statusText)
  } else {
    req.body.pipe(feedparser)
  }

  return new Promise((resolve, reject) => {
    const tweets = []
    feedparser.on('err', () => { throw new retry.AbortError('Error parsing feed') })

    feedparser.on('readable', function () {
      let item = this.read()

      while (item) {
        process.env.DEBUG && console.log('-- item', JSON.stringify(item, null, 2))
        const tweet = {
          author: item.author,
          authorLink: item.author.link,
          authorAvatar: item.meta.image.url,
          rss: url,
          bio: item.meta.title,
          text: item.title,
          html: item.description,
          date: new Date(item.date),
          link: item.link.replace('/nitter.net/', '/nitter.decent.social/')
        }
        tweets.push(tweet)
        item = this.read()
      }
    })
    feedparser.on('end', function () {
      spinner && (spinner.text = `done ${url}`)
      resolve(tweets)
    })
  })
}
