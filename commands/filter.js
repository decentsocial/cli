const { getTweets } = require('../src/tweets')
const getUsernames = require('../src/get-usernames')

const ora = require('ora')
const { bold, italic } = require('kleur')

exports.command = 'filter'
exports.desc = 'Filter tweets based on search term'
exports.builder = {
  max: {
    default: 50
  },
  term: {
    default: ''
  },
  username: {
    default: ''
  }
}
exports.handler = async function (argv) {
  process.env.DEBUG && console.log(argv)

  const spinner = ora('Loading..').start()
  const usernames = argv.username ? [argv.username] : await getUsernames()
  const term = argv.term
  const max = argv.max

  const tweets = await filter({ usernames, term, max }, spinner)
  for (const tweet of tweets) {
    console.log(`\n${bold(tweet.author)} - ${italic(tweet.date.toISOString())} - ${tweet.link}\n\n${tweet.text}\n\n`)
    process.env.DEBUG && console.log('-- tweet', JSON.stringify(tweet, null, 2))
  }
}

exports.filter = filter

async function filter ({ usernames = [], term, max = 50 }, spinner) {
  if (!Array.isArray(usernames) || usernames.length === 0) {
    spinner && spinner.stop()
    return Promise.reject(new Error('No usernames specified\nPlease provide `--username` or configure using `decent init`'))
  }
  if (!term) {
    spinner && spinner.stop()
    return Promise.reject(new Error('No term specified'))
  }

  let tweets = await getTweets(usernames, spinner)
  spinner && spinner.succeed('all done, enjoy your timeline')
  spinner && spinner.stop()

  tweets.sort((a, b) => +b.date - +a.date)

  tweets = tweets.filter((t) => t.text.toLowerCase().includes(term)).filter((_, i) => i < max)

  return tweets
}
