const fs = require('fs')
const path = require('path')

exports.command = 'follow <username>'
exports.desc = 'Follow given username'
exports.builder = {
  username: {
    default: ''
  }
}
exports.handler = function (argv, { existsSync, readFileSync, writeFileSync } = fs) {
  const usernamesPath = path.resolve(process.env.HOME, '.decent/usernames')
  if (existsSync(usernamesPath)) {
    let content = readFileSync(usernamesPath, { encoding: 'utf-8' }) || ''
    if (!content.includes(argv.username)) {
      content = content.split('\n').filter(Boolean).join('\n') + '\n' + argv.username + '\n'
      writeFileSync(usernamesPath, content)
      console.log('following user ', argv.username)
      return content
    }
    console.log('already following user ', argv.username)
    return false
  }
  const content = argv.username + '\n'
  writeFileSync(usernamesPath, content)
  console.log('following user ', argv.username)
  return content
}
