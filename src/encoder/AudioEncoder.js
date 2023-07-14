const BaseEncoder = require('./BaseEncoder.js')

class AudioEncoder extends BaseEncoder {
  constructor(inputPath) {
    super(inputPath)
  }

  setAudioChannels(channels) {
    this.ffmpegCommand.audioChannels(channels)
    return this
  }
}

module.exports = AudioEncoder
