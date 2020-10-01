
const { getTweets } = require('../src/tweets')
const getUsernames = require('../src/get-usernames')

const ora = require('ora')
const { bold, italic } = require('kleur')

exports.command = 'list'
exports.desc = 'Show timeline'
exports.builder = {
  max: {
    default: 50
  },
  username: {
    default: ''
  }
}
exports.handler = async function (argv) {
  process.env.DEBUG && console.log(argv)

  const spinner = ora('Loading..').start()
  const usernames = argv.username ? [argv.username] : await getUsernames()

  const max = argv.max
  const tweets = await list({ usernames, max }, spinner)
  for (const tweet of tweets) {
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
