const fs = require('fs')
const path = require('path')

const recursiveReadDir = (dir, filepaths = []) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filepath = path.join(dir, file)
    if (!fs.statSync(filepath).isDirectory()) {
      filepaths.push(filepath)
    } else {
      filepaths = filepaths.concat(recursiveReadDir(filepath))
    }
  })
  return filepaths
}

module.exports = recursiveReadDir
