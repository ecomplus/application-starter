const path = require('path')
const fs = require('fs')
const uglifyJS = require('uglify-js')

const hostingPath = path.resolve(__dirname, '../hosting')
fs.readdirSync(hostingPath).forEach(file => {
  if (file.endsWith('.js') && !file.endsWith('.min.js')) {
    const filePath = path.resolve(hostingPath, file)
    if (filePath) {
      const minify = uglifyJS.minify(fs.readFileSync(filePath, 'utf8'))
      if (minify.code) {
        fs.writeFileSync(filePath.replace(/.js$/, '.min.js'), minify.code, 'utf8')
      } else {
        console.error(minify)
      }
    }
  }
})
