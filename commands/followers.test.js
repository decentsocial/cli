const test = require('ava')
const { handler } = require('./followers')

test('lists followers of user', async t => {
  const usernames = await handler({ username: 'christian_fei' })
  t.true(Array.isArray(usernames))
  t.true(usernames.length > 0)
})
