function Main (req,res) {
  console.log(" ~ accediendo a /")
  return res.sendFile(__dirname + 'public/views/index.html')
}

module.exports = Main
