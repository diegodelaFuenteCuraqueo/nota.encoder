const convert = require('./src/routes/convert.js')
const main = require('./src/routes/main.js')
const express = require('express')
const bodyParser = require('body-parser')
const expressFileUpload = require('express-fileupload')
const app = express()

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
app.get('/', main) // main route

// POST METHODS - - -
app.post('/convert', convert) //  index.html convert form

// LISTENING - - -
const port = process.env.PORT || 9090
app.listen(port, () => {
  console.log("listening to port " + port)
})
