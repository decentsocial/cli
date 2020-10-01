const test = require('ava')
const { list } = require('./list')

test('lists users specified via --username, max 2', async t => {
  const result = await list({ username: 'lexfridman', max: 2 })
  t.truthy(result)
  t.is(result.length, 2)
  t.true(result[0].date > result[1].date)
})
