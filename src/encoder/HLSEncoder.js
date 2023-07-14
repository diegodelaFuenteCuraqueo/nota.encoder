const BaseEncoder = require('./AudioEncoder')

export class HLSEncoder  extends BaseEncoder {

  constructor(inputPath) {
    super(inputPath)
    this.segmentDuration = 10 // HLS segment duration in seconds (adjust as needed)
    this.playlistName = 'playlist.m3u8' // HLS playlist name
  }

  setSegmentDuration(duration) {
    this.segmentDuration = duration
    return this
  }

  setPlaylistName(name) {
    this.playlistName = name
    return this
  }

  convert(callback) {
    if (!this.outputPath) {
      return callback(new Error('Output path is not set.'))
    }

    const playlistPath = `${this.outputPath}/${this.playlistName}`

    this.ffmpegCommand
      .addOption('-hls_time', this.segmentDuration)
      .addOption('-hls_playlist_type', 'vod')
      .outputOptions('-hls_segment_filename', `${this.outputPath}/segment%03d.ts`)
      .output(playlistPath)
      .on('end', () => {
        callback(null, playlistPath)
      })
      .on('error', (err) => {
        callback(err)
      })
      .run()
  }
}
