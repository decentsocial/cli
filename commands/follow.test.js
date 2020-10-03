const test = require('ava')
const { handler } = require('./init')

test('follow username', async t => {
  const fakeFS = {
    existsSync: () => { fakeFS.existsSyncCalled = true; return true },
    readFileSync: () => { fakeFS.readFileSyncCalled = true; return true },
    writeFileSync: () => (fakeFS.writeFileSyncCalled = true)
  }

  const result = await handler({ username: 'lexfridman' }, fakeFS)
  t.false(result)
  t.true(fakeFS.existsSyncCalled)
  t.falsy(fakeFS.readFileSyncCalled)
  t.falsy(fakeFS.writeFileSyncCalled)
})
