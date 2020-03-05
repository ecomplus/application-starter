require('dotenv').config()

const {
  MARKET_TOKEN,
  MARKET_CATEGORY
} = process.env

const https = require('https')
const storeApp = require('../assets/application.json')

if (!MARKET_TOKEN) {
  console.error(new Error('Env `MARKET_TOKEN` is required and not set'))
  process.exit(1)
}

const { title, slug } = storeApp

const data = {
  title,
  slug,
  category: MARKET_CATEGORY || 'all',
  store_app: storeApp
}
if (storeApp.app_id) {
  data.id = storeApp.app_id
}

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

req.write(JSON.stringify(data))
req.end()
