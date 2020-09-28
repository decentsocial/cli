#!/usr/bin/env node

const { getTweets } = require('./src/tweets')
const args = require('./src/args')(process.argv)

const fs = require('fs')
const fsp = require('fs').promises
const ora = require('ora')
const { bold, italic } = require('kleur')

if (require.main === module) {
  process.env.DEBUG && console.log(args)

  const username = args.username
  const max = args.max || 50
  const reverse = !args.reverse

  main({ username, max, reverse })
    .then(() => {
      process.exit(0)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
} else {
  module.exports = main
}

async function main ({ username, max, reverse = true }) {
  const spinner = ora('Loading..').start()

  let allTweets = []
  if (!username) {
    const urlsFileExists = fs.existsSync(`${process.env.HOME}/.decent/urls`)
    const usernamesFileExists = fs.existsSync(`${process.env.HOME}/.decent/usernames`)
    const contents = urlsFileExists ? await fsp.readFile(`${process.env.HOME}/.decent/urls`, { encoding: 'utf8' }) : (usernamesFileExists ? await fsp.readFile(`${process.env.HOME}/.decent/usernames`, { encoding: 'utf8' }) : '')
    const urls = contents.split('\n').filter(Boolean)
    allTweets = await getTweets(urls, spinner)
  } else {
    allTweets = await getTweets(username.split(',').map(s => s.trim()).filter(Boolean), spinner)
  }
  spinner.succeed('all done, enjoy your timeline')
  spinner.stop()

  allTweets
    .sort((a, b) => +b.date - +a.date)

  allTweets = allTweets.filter((_, i) => i < max)

  reverse && allTweets.sort((a, b) => +a.date - +b.date)

  for (const tweet of allTweets) {
    console.log(`\n\n\n${bold(tweet.author)} - ${italic(tweet.date.toISOString())} - ${tweet.link}\n\n${tweet.text}`)
    process.env.DEBUG && console.log('-- tweet', JSON.stringify(tweet, null, 2))
  }
}
