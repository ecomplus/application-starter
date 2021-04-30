const path = require('path')
const fs = require('fs')
const uglifyJS = require('uglify-js')

;['hosting', 'functions/assets'].forEach(dir => {
  const scriptsPath = path.resolve(__dirname, '..', dir)
  const distPath = path.resolve(scriptsPath, 'dist')
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath)
  }

  fs.readdirSync(scriptsPath).forEach(file => {
    if (file.endsWith('.js') && !file.endsWith('.min.js')) {
      const filePath = path.resolve(scriptsPath, file)
      if (filePath) {
        const minify = uglifyJS.minify(fs.readFileSync(filePath, 'utf8'))
        if (minify.code) {
          const outputPath = filePath.replace(/\/([^/]+).js$/, '/dist/$1.min.js')
          fs.writeFileSync(outputPath, minify.code, 'utf8')
        } else {
          console.error(minify)
        }
      }
    }
  })
})
