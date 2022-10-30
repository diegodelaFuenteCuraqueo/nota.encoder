const express = require('express')
const bodyParser = require('body-parser')
const ffmpeg = require('fluent-ffmpeg')
const expressFileUpload = require('express-fileupload')
const app = express()

console.log(ffmpeg)

// using bodyparser: x-www-form-urlencoded, json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// main route
app.get('/', (req,res)=>{
  console.log(" ~ accediendo a /")
  res.sendFile(__dirname + '/index.html')
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
  console.log(req)
  let to = req.body.to
  let file = req.files.file
  console.log(to)
  console.log(file)

  file.mv("tmp/" + file.name, (err) => {
    if (err) return res.sendStatus(500).send(err)
    console.log("archivo subido correctamente")
  })

})

app.listen(4000, () => {
  console.log("listening to port 4000")
})

