import wm from './wm'
import movingWm from './movingWm'

if (process.argv.length <= 4) {
  console.log('Usage: npm run transcode [command] [vid file] [image file]')
  process.exit(1)
}

const [command, inputVid, inputImage] = process.argv.slice(2)

switch (command) {
  case 'wm':
    wm(inputVid, inputImage)
    break
  case 'movingWm':
    movingWm(inputVid, inputImage)
    break
}
