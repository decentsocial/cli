const test = require('ava')
const { handler } = require('./list')

test('lists users specified via --username, max 2', async t => {
  const result = await handler({ username: 'lexfridman', max: 2 })
  t.truthy(result)
  t.is(result.length, 2)
  t.is(result[0].user, 'lexfridman')
  t.true(result[0].date < result[1].date)
})

test('lists users specified via --username, max 2, reversed', async t => {
  const result = await handler({ username: 'lexfridman', max: 2, reverse: true })
  t.truthy(result)
  t.is(result.length, 2)
  t.true(result[0].date > result[1].date)
})
