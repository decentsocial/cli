
const { getTweets } = require('../src/tweets')
const getUsernames = require('../src/get-usernames')

const ora = require('ora')
const { bold, italic } = require('kleur')

exports.command = 'list <username>'
exports.desc = 'Show timeline'
exports.builder = {
  max: {
    default: 50
  },
  username: {
    default: ''
  },
  retweets: {
    default: true
  },
  replies: {
    default: true
  }
}
exports.handler = async function (argv) {
  process.env.DEBUG && console.log(argv)
  console.log('argv.username', argv.username)

  const spinner = ora('Loading..').start()
  const usernames = argv.username ? [argv.username] : await getUsernames()

  const max = argv.max
  const retweets = argv.retweets
  const replies = argv.replies
  const tweets = await list({ usernames, max, retweets, replies }, spinner)
  for (const tweet of tweets) {
    if (!retweets && tweet.retweet) continue
    if (!replies && tweet.reply) continue
    console.log(`\n${bold(tweet.author)} - ${italic(tweet.date.toISOString())} - ${tweet.link}\n\n${tweet.text}\n\n`)
    process.env.DEBUG && console.log('-- tweet', JSON.stringify(tweet, null, 2))
  }
}

exports.list = list

async function list ({ usernames = [], max = 50 }, spinner) {
  if (!Array.isArray(usernames) || usernames.length === 0) {
    spinner && spinner.stop()
    return Promise.reject(new Error('No usernames specified\nPlease provide `--username` or configure using `decent init`'))
  }

  let tweets = await getTweets(usernames, spinner)
  spinner && spinner.stop()

  tweets.sort((a, b) => +b.date - +a.date)

  tweets = tweets.filter((_, i) => i < max)

  return tweets
}
