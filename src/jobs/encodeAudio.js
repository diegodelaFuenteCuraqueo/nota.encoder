const ffmpeg = require('fluent-ffmpeg')
const deleteTempFiles = require('../Utils/deleteTempFiles.js')
const AudioEncoder = require('../encoder/AudioEncoder.js')

function encodeAudio(fileCopy, convertedFile, res) {
  // TODO: replace this code with encodeAudio setting accordingly
  const audioEncoder = new AudioEncoder(fileCopy)

  audioEncoder
    .setOutputPath(convertedFile)
    .setAudioCodec('aac')
    .setAudioBitrate('128k')
    .convert((err) => {
      if (err) {
        console.error(' > Error converting audio:', err)
        deleteTempFiles([fileCopy, convertedFile])
      } else {
        console.log(' > Audio conversion completed successfully.')
        return res.download(convertedFile, (err) => {
          if (err) throw err
          deleteTempFiles([fileCopy, convertedFile])
      })

      }
    })
}

module.exports = encodeAudio
