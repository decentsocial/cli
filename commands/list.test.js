const test = require('ava')
const { handler } = require('./list')

test('lists users specified via --username or in `~/.decent/usernames`', async t => {
  const result = await handler({ username: 'lexfridman', max: 1 })
  t.truthy(result)
  t.is(result.length, 1)
  t.is(result[0].user, 'lexfridman')
})
