const encodeHLS = require('../jobs/encodeHLS.js')
const checkTempFolder = require('../Utils/checkTempFolder.js')

async function ConvertHLS(req, res) {
  // TODO: replace this code with encodeHLS function
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let file = req.files.file
  let convertedFile = `tmp/${file.name.split('.')[0]}(output).m3u8`
  let fileCopy  = `tmp/${file.name}`

  console.log(" > Converting file: ")

  checkTempFolder()

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log(" > File uploaded successfully")
  })

  await encodeHLS(fileCopy, convertedFile, res)
}

module.exports = ConvertHLS
