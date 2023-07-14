const encodeVideo = require('../encoder/encodeVideo.js')
const checkTempFolder = require('../Utils/checkTempFolder.js')
const fs = require('fs')

async function convert(req, res) {
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let type = req.body.type || ''
  let file = req.files.file
  let convertedFile = `tmp/${file.name.split('.')[0]}(output).${to}`
  let fileCopy  = `tmp/${file.name}`

  console.log(" > Converting file: ")

  checkTempFolder()

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log(" > File uploaded successfully")
  })

  await encodeVideo(fileCopy, convertedFile, to, res)
}

module.exports = convert
