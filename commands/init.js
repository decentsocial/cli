const fs = require('fs')
const path = require('path')

const getFollowers = require('../src/get-followers')

exports.command = 'init'
exports.desc = 'Initialize ~/.decent/usernames'
exports.builder = {
  username: {
    default: 'elonmusk,lexfridman,mkbhd'
  }
}
exports.handler = async function (argv, { mkdirSync, existsSync, writeFileSync } = fs) {
  console.log('creating directory ~/.decent')
  const usernamesPath = path.resolve(process.env.HOME, '.decent/usernames')
  if (existsSync(usernamesPath)) {
    console.log('~/.decent/usernames already exists')
    console.log('feel free to edit this file and follow users you care about')
    return false
  }
  mkdirSync('~/.decent', { recursive: true })
  console.log('creating usernames ~/.decent/usernames')
  const usernames = argv.username.split(',')
  if (usernames.length === 1) {
    const followers = await getFollowers(usernames[0])
    const content = followers.join('\n')
    writeFileSync(usernamesPath, content, { encoding: 'utf-8' })
  } else {
    const content = usernames.join('\n')
    writeFileSync(usernamesPath, content, { encoding: 'utf-8' })
  }
  console.log('successfully created ~/.decent/usernames\nfeel free to edit this file and follow users you care about')
  return true
}
