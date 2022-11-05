const express = require('express')
const bodyParser = require('body-parser')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const expressFileUpload = require('express-fileupload')
const app = express()

console.log(ffmpeg)

// using bodyparser: x-www-form-urlencoded, json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// main route
app.get('/', (req,res)=>{
  console.log(" ~ accediendo a /")
  return res.sendFile(__dirname + '/index.html')
})

app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

// index.html convert form
app.post('/convert', (req,res)=>{
  console.log(" ~ accediendo a /convert")
  let to = req.body.to
  let file = req.files.file
  let fileName = `output.${to}`
  // console.log(to)
  console.log('file', file)

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send("ERROR", err)
    console.log("archivo subido correctamente")
  })

  // Converts file to especified format
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
      fs.unlink("tmp/"+file.name, (err)=>{
        if (err) throw err
        console.log("archivo borrado")
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

})

const port = process.env.PORT || 9090
app.listen(port, () => {
  console.log("listening to port " + port)
})

