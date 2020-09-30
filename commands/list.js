
const { getTweets } = require('../src/tweets')

const fs = require('fs')
const fsp = require('fs').promises
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
  },
  reverse: {
    default: true
  }
}
exports.handler = async function (argv) {
  process.env.DEBUG && console.log(argv)

  let username = argv.username
  const max = argv.max || 50
  const reverse = !argv.reverse

  if (!username) {
    const usernamesFileExists = fs.existsSync(`${process.env.HOME}/.decent/usernames`)
    const contents = usernamesFileExists ? await fsp.readFile(`${process.env.HOME}/.decent/usernames`, { encoding: 'utf8' }) : ''
    username = contents.split('\n').filter(Boolean).join(',')
  }

  list({ username, max, reverse })
    .then(() => {
      process.exit(0)
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}

async function list ({ username, max, reverse = true }) {
  if (!username) {
    return Promise.reject(new Error('No usernames specified\nPlease provide `--username` or configure using `decent init`'))
  }

  const spinner = ora('Loading..').start()
  let allTweets = await getTweets(username.split(',').map(s => s.trim()).filter(Boolean), spinner)
  spinner.succeed('all done, enjoy your timeline')
  spinner.stop()

  allTweets
    .sort((a, b) => +b.date - +a.date)

  allTweets = allTweets.filter((_, i) => i < max)

  reverse && allTweets.sort((a, b) => +a.date - +b.date)

  for (const tweet of allTweets) {
    console.log(`\n${bold(tweet.author)} - ${italic(tweet.date.toISOString())} - ${tweet.link}\n\n${tweet.text}\n\n`)
    process.env.DEBUG && console.log('-- tweet', JSON.stringify(tweet, null, 2))
  }
}
