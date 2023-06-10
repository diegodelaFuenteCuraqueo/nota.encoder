function main (req,res) {
  console.log(" ~ accediendo a /")
  return res.sendFile(__dirname + '../views/index.html')
}

module.exports = main
