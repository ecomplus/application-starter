const path = require('path')
const fs = require('fs')
const uglifyJS = require('uglify-js')

const publicPath = path.resolve(__dirname, '../functions/public')
fs.readdirSync(publicPath).forEach(file => {
  if (file.endsWith('.js') && !file.endsWith('.min.js')) {
    const filePath = path.resolve(publicPath, file)
    if (filePath) {
      const jsContent = uglifyJS.minify(fs.readFileSync(filePath, 'utf8')).code
      fs.writeFileSync(filePath.replace(/.js$/, '.min.js'), jsContent, 'utf8')
    }
  }
})
