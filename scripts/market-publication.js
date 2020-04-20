require('dotenv').config()

const { MARKET_TOKEN } = process.env

if (!MARKET_TOKEN) {
  console.error(new Error('Env `MARKET_TOKEN` is required and not set'))
  process.exit(1)
}

const path = require('path')
const fs = require('fs')
const https = require('https')
const { baseUri } = require('./_constants')
const { app } = require('../ecomplus-market.json')
const storeApp = require('../assets/application.json')

if (!storeApp.version_date) {
  storeApp.version_date = new Date().toISOString()
}

app.id = storeApp.app_id
app.store_app = storeApp
;['title', 'slug'].forEach(field => {
  if (!app[field]) {
    app[field] = storeApp[field]
  }
})

const dirPublic = path.resolve(__dirname, '../functions/public')
if (fs.existsSync(path.resolve(dirPublic, 'icon.png'))) {
  app.icon = `${baseUri}icon.png`
}
try {
  app.description = fs.readFileSync(path.resolve(dirPublic, 'description.md'), 'utf8')
} catch (e) {
  app.description = `
# ${app.title}
${app.short_description}
`
}

console.log('New app data:')
console.log(JSON.stringify(app, null, 2))

const req = https.request({
  hostname: 'market.e-com.plus',
  port: 443,
  path: '/v2/applications',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${MARKET_TOKEN}`
  }
}, res => {
  const { statusCode } = res
  if (statusCode >= 200 && statusCode <= 204) {
    console.log('Application updated')
  } else {
    console.error(new Error(`API request error with status ${statusCode}`))
    process.exit(1)
  }

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
  process.exit(1)
})

req.write(JSON.stringify(app))
req.end()
