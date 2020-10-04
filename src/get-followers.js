const fetch = require('node-fetch')

module.exports = async function getFollowers (username = '', max = 100) {
  // code adapted from https://gist.github.com/zedeus/555f9709c1ad744b442bf9a6e9856aaf
  const templateUrl = `https://mobile.twitter.com/${username}/following`
  let cursor = ''
  const usernames = []
  let first = true

  do {
    let url = templateUrl
    if (!first) {
      url = templateUrl + `?cursor=${cursor}`
    }
    process.env.DEBUG && console.log('url', url)
    first = false

    const res = await fetch(url)
    const text = await res.text()
    let users = text.match(/@<\/span>(\w+)/gi)
    users = users.map(u => u.replace('@</span>', ''))
    if (Array.isArray(users)) {
      process.env.DEBUG && console.log('found users +', users.length)
      usernames.push(...users)
    }
    if (usernames.length > max) {
      usernames.length = max
    }

    const matches = text.match(/cursor=([0-9]+)/)
    if (matches) {
      const newCursor = matches[0].replace('cursor=', '')
      if (cursor === newCursor) return usernames
      cursor = newCursor
    } else {
      return usernames
    }
  } while (true)
}
