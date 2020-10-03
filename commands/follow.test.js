const test = require('ava')
const { handler } = require('./follow')

test('follow username', t => {
  const fakeFS = {
    existsSync: () => { fakeFS.existsSyncCalled = true; return true },
    readFileSync: () => { fakeFS.readFileSyncCalled = true; return '' },
    writeFileSync: () => (fakeFS.writeFileSyncCalled = true)
  }

  const result = handler({ username: 'lexfridman' }, fakeFS)
  t.truthy(result)
  t.true(fakeFS.existsSyncCalled)
  t.true(fakeFS.readFileSyncCalled)
  t.true(fakeFS.writeFileSyncCalled)
})
test('does not follow user twice', t => {
  const fakeFS = {
    existsSync: () => { fakeFS.existsSyncCalled = true; return true },
    readFileSync: () => { fakeFS.readFileSyncCalled = true; return 'lexfridman\n' },
    writeFileSync: () => (fakeFS.writeFileSyncCalled = true)
  }

  const result = handler({ username: 'lexfridman' }, fakeFS)
  t.falsy(result)
  t.true(fakeFS.existsSyncCalled)
  t.true(fakeFS.readFileSyncCalled)
  t.falsy(fakeFS.writeFileSyncCalled)
})
