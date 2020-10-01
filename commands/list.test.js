const test = require('ava')
const { list } = require('./list')

test('lists users tweets, max 2', async t => {
  const result = await list({ usernames: ['lexfridman'], max: 2 })
  t.truthy(result)
  t.is(result.length, 2)
  t.true(result[0].date > result[1].date)
})
