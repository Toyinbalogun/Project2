// Dependencies
const express = require('express')

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 4000

// Create express app instance.
const app = express()

// Routes
//TO DO

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log('Server listening on: http://localhost:' + PORT)
})
  

