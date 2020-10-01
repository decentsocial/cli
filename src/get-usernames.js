const fs = require('fs')
const fsp = require('fs').promises

module.exports = async function ({ existsSync = fs.existsSync, readFile = fsp.readFile } = {}) {
  const usernamesFileExists = existsSync(`${process.env.HOME}/.decent/usernames`)
  if (!usernamesFileExists) return []

  const contents = await readFile(`${process.env.HOME}/.decent/usernames`, { encoding: 'utf8' })
  return contents.split('\n').filter(Boolean)
}
