const test = require('ava')
const getUsernames = require('./get-usernames')

test('[] when ~/.decent/usernames does not exist', async t => {
  const fakeFS = {
    existsSync () { fakeFS.existsSyncCalled = true; return false },
    async readFile () { fakeFS.readFileCalled = true; return '' }
  }
  const usernames = await getUsernames(fakeFS)
  t.deepEqual(usernames, [])
  t.true(fakeFS.existsSyncCalled)
  t.falsy(fakeFS.readFileCalled)
})
test('gets usernames from ~/.decent/usernames', async t => {
  const fakeFS = {
    existsSync () { fakeFS.existsSyncCalled = true; return true },
    async readFile () { fakeFS.readFileCalled = true; return 'lexfridman\nelonmusk' }
  }
  const usernames = await getUsernames(fakeFS)
  t.deepEqual(usernames, ['lexfridman', 'elonmusk'])
  t.true(fakeFS.existsSyncCalled)
  t.true(fakeFS.readFileCalled)
})
