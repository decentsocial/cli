const fs = require('fs')
const path = require('path')
const { bold } = require('kleur')

exports.command = 'follow <username>'
exports.desc = 'Follow given username'
exports.builder = {
  username: {
    default: ''
  }
}
exports.handler = function (argv, { existsSync, readFileSync, writeFileSync } = fs) {
  const usernamesPath = path.resolve(process.env.HOME, '.decent/usernames')
  let content = ''
  if (existsSync(usernamesPath)) {
    content = readFileSync(usernamesPath, { encoding: 'utf-8' }) || ''
    if (content.includes(argv.username)) {
      console.log(bold('already following user '), argv.username)
      return false
    }
  }
  content = content.split('\n').filter(Boolean).join('\n') + '\n' + argv.username + '\n'
  writeFileSync(usernamesPath, content)
  console.log(bold('following user '), argv.username)
  return content
}
