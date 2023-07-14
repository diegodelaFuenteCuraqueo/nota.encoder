const ffmpeg = require('fluent-ffmpeg')
const deleteTempFiles = require('../Utils/deleteTempFiles.js')
const VideoEncoder = require('../encoder/VideoEncoder.js')

function encodeVideo(fileCopy, convertedFile, res) {

  const videoEncoder = new VideoEncoder(fileCopy)

  videoEncoder
    .setOutputPath(convertedFile)
    .setVideoCodec('libx264')
    //.setAudioCodec('aac')
    //.setVideoBitrate('1000k')
    //.setFrameRate(30)
    //.setResolution(640, 480)
    .convert((err) => {
      if (err) {
        console.error('Error converting video:', err)
        deleteTempFiles([fileCopy, convertedFile])
      } else {
        console.log('Video conversion completed successfully.')
        return res.download(convertedFile, (err) => {
          if (err) throw err
          deleteTempFiles([fileCopy, convertedFile])
      })

      }
    })
}

module.exports = encodeVideo
