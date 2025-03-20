const DeviceFile = require('./')
const test = require('brittle')
const path = require('path')

test('basic', async function (t) {
  const tmp = await t.tmp()
  const p = path.join(tmp, 'TEST')

  for (let i = 0; i < 100; i++) {
    if (!(await DeviceFile.resume(p))) {
      await DeviceFile.create(p)
    }
  }
  for (let i = 0; i < 100; i++) {
    await DeviceFile.create(p + i)
    await DeviceFile.resume(p + i)
  }
})
