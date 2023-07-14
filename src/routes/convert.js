const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

function convert(req,res) {
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let type = req.body.type || ''
  let file = req.files.file
  let fileName = `output.${to}`
  console.log('file', file)

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log("archivo subido correctamente")
  })

  // Converts file to especified format (debería ir en controller)
  ffmpeg("tmp/"+file.name)
    .withOutputFormat(to)
    .on('end', (stdout,stderr) => {
      console.log(" Finalizado")
      return res.download( __dirname + fileName, (err) => {
        if (err) throw err;
        fs.unlink( __dirname + fileName, (err) => {
          if (err) throw err;
          console.log("archivo borrado");
        })
      })
    })
    .on('error', (err)=>{
      console.log("error:",err)
      fs.unlink( __dirname + fileName, (err) => {
        if (err) throw err;
        console.log("archivo borrado");
      })
    })
    .saveToFile(__dirname + fileName)
}

module.exports = convert
