const test = require('ava')
const { filter } = require('./filter')

test('filters tweets based on term', async t => {
  const result = await filter({ term: 'erlang', username: 'joeerl' })
  t.true(result instanceof Array)
  t.true(result.length > 0)
  t.is(result.filter(t => t.text.toLowerCase().includes('erlang')).length, result.length)
})
