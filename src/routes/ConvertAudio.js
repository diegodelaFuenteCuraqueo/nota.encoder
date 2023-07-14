const encodeAudio = require('../jobs/encodeAudio.js')
const checkTempFolder = require('../Utils/checkTempFolder.js')

async function ConvertAudio(req, res) {
  // TODO: replace this code with encodeAudio function
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let file = req.files.file
  let convertedFile = `tmp/${file.name.split('.')[0]}(output).aac`
  let fileCopy  = `tmp/${file.name}`

  console.log(" > Converting file: ")

  checkTempFolder()

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log(" > File uploaded successfully")
  })

  await encodeAudio(fileCopy, convertedFile, res)
}

module.exports = ConvertAudio
