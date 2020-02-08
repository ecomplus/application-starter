'use strict'

// debug errors in files
// require logger module first of any code
require('console-files')

// web application
// recieve requests from Nginx by reverse proxy
require('./bin/web')