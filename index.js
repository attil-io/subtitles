const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/api/result', (req, res) => {
      const result = {
	      field: 42,
	      another: 43
      }
      res.json(result)
  })
  .get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

