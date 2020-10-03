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
  console.log('following user ', argv.username)
  const usernamesPath = path.resolve(process.env.HOME, '.decent/usernames')
  if (existsSync(usernamesPath)) {
    let content = readFileSync(usernamesPath, {encoding: 'utf-8'}) || ''
    if (!content.includes(argv.username)) {
      content = content.split('\n').filter(Boolean).join('\n')
      writeFileSync(usernamesPath, content + '\n' + argv.username + '\n')
      return true
    }
    return false
  }
  writeFileSync(usernamesPath, argv.username)
  return true
}
