const express = require('express')
const bodyParser = require('body-parser')
const expressFileUpload = require('express-fileupload')
const app = express()

const Main = require('./src/routes/Main.js')
const convertVideo = require('./src/routes/ConvertVideo.js')
const convertAudio = require('./src/routes/ConvertAudio.js')
const convertHLS = require('./src/routes/ConvertHLS.js')

//  CONFIGURATIONS - - -
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

// GET METHODS - - -
app.get('/', Main) // main route

// POST METHODS - - -
app.post('/convertVideo', convertVideo)
app.post('/convertAudio', convertAudio)
app.post('/convertHLS', convertHLS)


// LISTENING - - -
const port = process.env.PORT || 9090
app.listen(port, () => {
  console.log("listening to port " + port)
})
