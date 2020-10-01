
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
  }
}
exports.handler = async function (argv) {
  process.env.DEBUG && console.log(argv)

  if (!argv.username) {
    const usernamesFileExists = fs.existsSync(`${process.env.HOME}/.decent/usernames`)
    const contents = usernamesFileExists ? await fsp.readFile(`${process.env.HOME}/.decent/usernames`, { encoding: 'utf8' }) : ''
    argv.username = contents.split('\n').filter(Boolean).join(',')
  }

  return list(argv)
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

exports.list = list

async function list ({ username, max = 50 }) {
  if (!username) {
    return Promise.reject(new Error('No usernames specified\nPlease provide `--username` or configure using `decent init`'))
  }

  const spinner = ora('Loading..').start()
  let allTweets = await getTweets(username.split(',').map(s => s.trim()).filter(Boolean), spinner)
  spinner.succeed('all done, enjoy your timeline')
  spinner.stop()

  allTweets.sort((a, b) => +b.date - +a.date)

  allTweets = allTweets.filter((_, i) => i < max)

  return allTweets
}
