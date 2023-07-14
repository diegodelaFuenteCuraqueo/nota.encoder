const BaseEncoder = require('./AudioEncoder')

class VideoEncoder extends BaseEncoder {
  constructor(inputPath) {
    super(inputPath)
  }

  setFrameRate(frameRate) {
    this.ffmpegCommand.fps(frameRate)
    return this
  }

  setResolution(width, height) {
    this.ffmpegCommand.size(`${width}x${height}`)
    return this
  }
}

module.exports = VideoEncoder
