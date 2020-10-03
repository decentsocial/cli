const test = require('ava')
const getFollowers = require('./get-followers')

test('returns followers of user', async t => {
  const usernames = await getFollowers('christian_fei')
  t.true(Array.isArray(usernames))
  t.true(usernames.length > 0)
})
