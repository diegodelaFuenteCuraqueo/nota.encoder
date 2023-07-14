const ffmpeg = require('fluent-ffmpeg')

class BaseEncoder {
  constructor(inputPath) {
    this.inputPath = inputPath
    this.ffmpegCommand = ffmpeg(inputPath)
  }

  setOutputPath(outputPath) {
    this.outputPath = outputPath
    return this
  }

  setVideoCodec(codec) {
    this.ffmpegCommand.videoCodec(codec)
    return this
  }

  setAudioCodec(codec) {
    this.ffmpegCommand.audioCodec(codec)
    return this
  }

  setVideoBitrate(bitrate) {
    this.ffmpegCommand.videoBitrate(bitrate)
    return this
  }

  setAudioBitrate(bitrate) {
    this.ffmpegCommand.audioBitrate(bitrate)
    return this
  }

  addOption(option) {
    this.ffmpegCommand.addOption(option)
    return this
  }

  convert(callback) {
    if (!this.outputPath) {
      return callback(new Error('Output path is not set.'))
    }

    this.ffmpegCommand.output(this.outputPath).on('end', () => {
      callback(null)
    }).on('error', (err) => {
      callback(err)
    }).run()
  }
}

module.exports = BaseEncoder
