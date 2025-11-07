import DeviceFile from './index.js'

const d = new DeviceFile('DEVICE', { data: { id: 'example' }})
await d.ready()
