'use strict'

// debug errors in files
// require logger module first of any code
require('console-files')

// web application
// recieve requests from Nginx by reverse proxy
require('./bin/web')

// check DAEMON_SERVICES env var before running daemon processes
// by doing that the app may be able to be executed on multiple servers (load balancing)
if (process.env.DAEMON_SERVICES === 'true' || process.env.DAEMON_SERVICES === true) {
  // local application
  require('./bin/local')
}
