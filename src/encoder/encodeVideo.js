const ffmpeg = require('fluent-ffmpeg')
const deleteTempFiles = require('../Utils/deleteTempFiles.js')

function encodeVideo(fileCopy, convertedFile, to, res) {
  return new Promise( () => {
    ffmpeg(fileCopy)
    .withOutputFormat(to)
    .on('end', (stdout,stderr) => {
      console.log(" > Encoding Done")
      return res.download(convertedFile, (err) => {
        if (err) throw err
        deleteTempFiles([fileCopy, convertedFile])
      })
    })
    .on('error', (err)=>{
      console.log("error: ",err)
      deleteTempFiles([fileCopy, convertedFile])
      return res.sendStatus(500).send("ERROR", err)
    })
    .saveToFile(convertedFile)
  })
}

module.exports = encodeVideo
