const fs = require('fs')
const path = require('path')

exports.command = 'init'
exports.desc = 'Initialize ~/.decent/usernames'
exports.builder = {
  username: {
    default: 'elonmusk,lexfridman,mkbhd'
  }
}
exports.handler = function (argv) {
  console.log('creating directory ~/.decent')
  fs.mkdirSync('~/.decent', { recursive: true })
  if (fs.existsSync(path.resolve(process.env.HOME, '.decent/usernames'))) {
    console.log('~/.decent/usernames already exists')
    console.log('feel free to edit this file and follow users you care about')
    return
  }
  console.log('creating usernames ~/.decent/usernames')
  fs.writeFileSync(path.resolve(process.env.HOME, '.decent/usernames'), argv.username.split(',').join('\n'), { encoding: 'utf-8' })
  console.log('successfully created ~/.decent/usernames\nfeel free to edit this file and follow users you care about')
}
