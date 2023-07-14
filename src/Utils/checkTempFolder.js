const fs = require('fs')
const tmpFolder = 'tmp';

// Check if the tmp folder exists, if not create it
function checkTempFolder() {
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdir(tmpFolder, (err) => {
      if (err) {
        console.error(" * Error creating tmp folder:", err)
      } else {
        console.log(" * Tmp folder created successfully")
      }
    })
  } else {
    console.log("* Tmp folder already exists")
  }
}

module.exports = checkTempFolder
