const test = require('ava')
const { handler } = require('./init')

test('noop if ~/.decent/usernames exists', async t => {
  const fakeFS = {
    mkdirSync: () => (fakeFS.mkdirSyncCalled = true),
    existsSync: () => { fakeFS.existsSyncCalled = true; return true },
    writeFileSync: () => (fakeFS.writeFileSyncCalled = true)
  }

  const result = await handler({ username: 'lexfridman' }, fakeFS)
  t.false(result)
  t.true(fakeFS.existsSyncCalled)
  t.falsy(fakeFS.mkdirSyncCalled)
  t.falsy(fakeFS.writeFileSyncCalled)
})

test('creates ~/.decent/usernames if missing', async t => {
  const fakeFS = {
    mkdirSync: () => (fakeFS.mkdirSyncCalled = true),
    existsSync: () => { fakeFS.existsSyncCalled = true; return false },
    writeFileSync: () => (fakeFS.writeFileSyncCalled = true)
  }

  const result = await handler({ username: 'lexfridman' }, fakeFS)
  t.true(result)
  t.true(fakeFS.existsSyncCalled)
  t.true(fakeFS.mkdirSyncCalled)
  t.true(fakeFS.writeFileSyncCalled)
})
