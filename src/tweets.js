const FeedParser = require('feedparser')
const fetch = require('node-fetch')
const limit = require('p-limit')(10)

module.exports = {
  getTweets,
  getTweetsForUser
}

async function getTweets (usernames = [], spinner) {
  const tweetsByUser = await Promise.all(usernames.map((url) => limit(() => {
    console.log('getting tweets for user', url)
    return getTweetsForUser(url, spinner)
      .catch(err => {
        console.error(`an error occurred while fetching ${url}`, err.message, err)
        throw new Error(err)
      })
  })))
  return tweetsByUser
    .reduce((acc, curr) => acc.concat(curr), [])
}
async function getTweetsForUser (username = '', spinner) {
  const url = username.startsWith('https:') ? username : `https://nitter.decent.social/${username}/rss`
  spinner && (spinner.text = `loading ${url}`)

  const req = await fetch(url, {
    'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/${+Math.random() * 1000}.36 (KHTML, like Gecko) Chrome/31.0.${+Math.random() * 1000}.63 Safari/${+Math.random() * 1000}.36`,
    accept: 'application/json'
  })
  const feedparser = new FeedParser()

  if (req.status !== 200) {
    return []
  } else {
    req.body.pipe(feedparser)
  }

  return new Promise((resolve, reject) => {
    const tweets = []
    feedparser.on('err', () => { resolve([]) })

    feedparser.on('readable', function () {
      let item = this.read()

      while (item) {
        process.env.DEBUG && console.log('-- item', JSON.stringify(item, null, 2))
        try {
          const text = item.title || ''
          const tweet = {
            author: item.author,
            authorLink: item.author.link,
            authorAvatar: item.meta.image.url,
            rss: url,
            bio: item.meta.title,
            text: text,
            html: item.description,
            date: new Date(item.date),
            link: item.link.replace('/nitter.net/', '/nitter.decent.social/'),
            retweet: text.startsWith('RT by'),
            reply: text.startsWith('R to')
          }
          tweets.push(tweet)
        } catch (err) {
          console.error('failed to parse tweet', item)
        }
        item = this.read()
      }
    })
    feedparser.on('end', function () {
      spinner && (spinner.text = `done ${url}`)
      resolve(tweets)
    })
  })
}
