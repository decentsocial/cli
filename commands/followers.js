const getFollowers = require('../src/get-followers')

exports.command = 'followers <username>'
exports.desc = 'Followers of a given username'
exports.builder = {
  username: {
    default: ''
  }
}
exports.handler = async function (argv) {
  const followers = await getFollowers(argv.username)
  console.log(followers.filter(Boolean).join('\n'))
  return followers
}
