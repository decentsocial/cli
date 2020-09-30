const fs = require('fs')
const path = require('path')

exports.command = 'init'
exports.desc = 'Initialize ~/.decent/usernames'
exports.builder = {
  username: {
    default: 'elonmusk,lexfridman,mkbhd'
  }
}
exports.handler = function (argv, { mkdirSync, existsSync, writeFileSync } = fs) {
  console.log('creating directory ~/.decent')
  const usernamesPath = path.resolve(process.env.HOME, '.decent/usernames')
  if (existsSync(usernamesPath)) {
    console.log('~/.decent/usernames already exists')
    console.log('feel free to edit this file and follow users you care about')
    return false
  }
  mkdirSync('~/.decent', { recursive: true })
  console.log('creating usernames ~/.decent/usernames')
  const content = argv.username.split(',').join('\n')
  writeFileSync(usernamesPath, content, { encoding: 'utf-8' })
  console.log('successfully created ~/.decent/usernames\nfeel free to edit this file and follow users you care about')
  return true
}
