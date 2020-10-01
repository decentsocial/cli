const test = require('ava')
const { handler } = require('./filter')

test.skip('filters tweets based on keyword', async t => {
  const result = await handler({ filter: '', username: 'joeerl' })

})
