const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send('Hello'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

