const fs = require('fs')

function deleteTempFiles(paths) {
  if (Array.isArray(paths)) {
    paths.forEach(path => {
      fs.unlink(path, (err) => {
        if (err) throw err
        console.log(" > file deleted : ", path)
      })
    })
  } else {
    fs.unlink(paths, (err) => {
      if (err) throw err
      console.log(" > file deleted : ", paths)
    })
  }
}

module.exports = deleteTempFiles