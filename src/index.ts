import ffmpeg from 'fluent-ffmpeg'

if (process.argv.length <= 3) {
  console.log('vid and image are required')
  process.exit(1)
}

const [inputVid, inputImage] = process.argv.slice(2)

ffmpeg()
  .addInput(inputVid)
  .addInput(inputImage)
  .complexFilter([
    // 0 video input, 1 image input => logo sized down based on vid size
    '[1][0]scale2ref=h=ow/mdar:w=iw/16[smaller_logo][vid]',
    // logo input => logo with opacity applied
    '[smaller_logo]format=argb, colorchannelmixer=aa=0.5[logo_with_opacity]',
    // video input => video with the logo positioned
    '[vid][logo_with_opacity]overlay=(main_w-w):(main_h-H)',
  ])
  .on('start', (command: any) => console.log('>>> Started ffmpeg with:', command))
  .on('end', (stdout: any, stderr: any) => console.log('>>> Transcoding ended', stdout, stderr))
  .on('stderr', (error: any) => console.log('>>> STDError:', error))
  .on('error', (error: any) => console.log('>>> Error:', error))
  .on('progress', (progress: any) => console.log('>>> Progress:', progress))
  .save('output.mp4')
