const ffmpeg = require('fluent-ffmpeg')
const deleteTempFiles = require('../Utils/deleteTempFiles.js')
const HLSEncoder = require('../encoder/HLSEncoder.js')

function encodeHLS(fileCopy, convertedFile, res) {
  // TODO: replace this code with encodeHLS settings accordingly
  const HLSEncoder = new HLSEncoder(fileCopy)

  videoEncoder
    .setOutputPath(convertedFile)
    .setVideoCodec('libx264')
    .setAudioCodec('aac')
    //.setVideoBitrate('1000k')
    //.setFrameRate(30)
    //.setResolution(640, 480)
    .setPlaylistName('myplaylist.m3u8')
    .setVideoCodec('libx264')
    .setAudioCodec('aac')
    .convert((err) => {
      if (err) {
        console.error(' > Error converting HLS:', err)
        deleteTempFiles([fileCopy, convertedFile])
      } else {
        console.log(' > HLS conversion completed successfully.')
        return res.download(convertedFile, (err) => {
          if (err) throw err
          deleteTempFiles([fileCopy, convertedFile])
      })

      }
    })
}

module.exports = encodeHLS
