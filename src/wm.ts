import ffmpeg from 'fluent-ffmpeg'

export default function wm(vid: string, image: string) {
  ffmpeg()
    .addInput(vid)
    .addInput(image)
    .complexFilter([
      // 0 video input, 1 image input => logo sized down based on vid size
      '[1][0]scale2ref=h=ow/mdar:w=iw/4[smaller_logo][vid]',
      // logo input => logo with opacity applied
      '[smaller_logo]format=argb, colorchannelmixer=aa=0.2[logo_with_opacity]',
      // video input => video with the logo positioned
      '[vid][logo_with_opacity]overlay=(main_w-W + 10):(main_h-h - 10)',
    ])
    .on('start', (command: any) => console.log('>>> Started ffmpeg with:', command))
    .on('end', (stdout: any, stderr: any) => console.log('>>> Transcoding ended', stdout, stderr))
    .on('stderr', (error: any) => console.log('>>> STDError:', error))
    .on('error', (error: any) => console.log('>>> Error:', error))
    .on('progress', (progress: any) => console.log('>>> Progress:', progress))
    .save('output.mp4')
}
