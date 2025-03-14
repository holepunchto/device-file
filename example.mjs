import device from './index.js'

if (await device.resume('DEVICE')) {
  console.log('existing one!')
} else {
  await device.create('DEVICE')
  console.log('made one')
}
