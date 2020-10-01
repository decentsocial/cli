const { getTweets } = require('../src/tweets')

const fs = require('fs')
const fsp = require('fs').promises
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

  if (!argv.username) {
    const usernamesFileExists = fs.existsSync(`${process.env.HOME}/.decent/usernames`)
    const contents = usernamesFileExists ? await fsp.readFile(`${process.env.HOME}/.decent/usernames`, { encoding: 'utf8' }) : ''
    argv.username = contents.split('\n').filter(Boolean).join(',')
  }
  const spinner = ora('Loading..').start()

  return filter(argv, spinner)
    .then((tweets) => {
      for (const tweet of tweets) {
        console.log(`\n${bold(tweet.author)} - ${italic(tweet.date.toISOString())} - ${tweet.link}\n\n${tweet.text}\n\n`)
        process.env.DEBUG && console.log('-- tweet', JSON.stringify(tweet, null, 2))
      }

      process.exit(0)
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}

exports.filter = filter

async function filter ({ username, term, max = 50 }, spinner) {
  if (!username) {
    return Promise.reject(new Error('No usernames specified\nPlease provide `--username` or configure using `decent init`'))
  }
  if (!term) {
    return Promise.reject(new Error('No term specified'))
  }

  const usernames = username.split(',').map(s => s.trim()).filter(Boolean)
  let tweets = await getTweets(usernames, spinner)
  spinner && spinner.succeed('all done, enjoy your timeline')
  spinner && spinner.stop()

  tweets.sort((a, b) => +b.date - +a.date)

  tweets = tweets.filter((t) => t.text.toLowerCase().includes(term)).filter((_, i) => i < max)

  return tweets
}
