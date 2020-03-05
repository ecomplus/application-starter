'use strict'
const https = require('https')
const storeApp = require('./assets/application.json')
const { MARKET_TOKEN } = process.env

if (!MARKET_TOKEN) {
  console.error('Env MARKET_TOKEN is unset')
  process.exit(1)
}

const { title, slug } = storeApp

let data = {
  title,
  slug,
  category: 'all',
  store_app: storeApp
}

if (storeApp.app_id) {
  data.id = storeApp.app_id
}

data = JSON.stringify(data)

const opt = {
  hostname: 'market.e-com.plus',
  port: 443,
  path: '/v2/applications',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + MARKET_TOKEN
  }
}

const req = https.request(opt, res => {
  const { statusCode } = res
  if (statusCode >= 201 && statusCode <= 204) {
    console.log('Application updated')
  } else {
    console.error('API Request error')
  }
  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
  process.exit(1)
})

req.write(data)
req.end()
