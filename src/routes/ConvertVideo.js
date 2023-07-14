const encodeVideo = require('../jobs/encodeVideo.js')
const checkTempFolder = require('../Utils/checkTempFolder.js')

async function ConvertVideo(req, res) {
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let file = req.files.file
  let convertedFile = `tmp/${file.name.split('.')[0]}(output).mp4`
  let fileCopy  = `tmp/${file.name}`

  console.log(" > Converting file: ")

  checkTempFolder()

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log(" > File uploaded successfully")
  })

  await encodeVideo(fileCopy, convertedFile, res)
}

module.exports = ConvertVideo
