const DeviceFile = require('./')
const test = require('brittle')
const path = require('path')

test('basic', async function (t) {
  const tmp = await t.tmp()
  const p = path.join(tmp, 'TEST')

  for (let i = 0; i < 100; i++) {
    const d = new DeviceFile(p)
    await d.ready()
    await d.close()
  }

  for (let i = 0; i < 100; i++) {
    const d = new DeviceFile(p + i)
    await d.ready()
    await d.close()
  }

  t.pass('no crashes')
})

test('lockable', async function (t) {
  const tmp = await t.tmp()
  const p = path.join(tmp, 'TEST')

  const a = new DeviceFile(p, { lock: true })
  await a.ready()

  const b = new DeviceFile(p, { lock: true })

  try {
    await b.ready()
  } catch {
    t.pass('errored')
    t.is(b.fd, 0)
  }

  await a.close()
  await b.close()
})
