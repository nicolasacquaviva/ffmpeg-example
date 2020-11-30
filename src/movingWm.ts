import ffmpeg from 'fluent-ffmpeg'

export default function movingWm(vid: string, image: string) {
  ffmpeg()
    .addInput(vid)
    .addInput(image)
    .complexFilter([
      // 0 video input, 1 image input => logo sized down based on vid size
      '[1][0]scale2ref=h=ow/mdar:w=iw/4[smaller_logo][vid]',
      // logo input => logo with opacity applied
      '[smaller_logo]format=argb, colorchannelmixer=aa=0.2[logo_with_opacity]',
      // video input and logo => video with the moving logo
      "[vid][logo_with_opacity]overlay='if(gte(t,1), -w+(t-1)*100, NAN)':(main_h-overlay_h)/2",
    ])
    .on('start', (command: any) => console.log('>>> Started ffmpeg with:', command))
    .on('end', (stdout: any, stderr: any) => console.log('>>> Transcoding ended', stdout, stderr))
    .on('stderr', (error: any) => console.log('>>> STDError:', error))
    .on('error', (error: any) => console.log('>>> Error:', error))
    .on('progress', (progress: any) => console.log('>>> Progress:', progress))
    .save('output.mp4')
}
