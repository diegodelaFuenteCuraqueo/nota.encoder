const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// using bodyparser: x-www-form-urlencoded, json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

app.post('/convert', (req,res)=>{
  let to = req.body.to
  console.log(to)
})

app.listen(4000, () => {
  console.log("listening to port 4000")
})

