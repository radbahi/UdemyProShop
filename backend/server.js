const express = require('express') // require is common node syntax
const products = require('./data/products')

const app = express()

// if we get a GET request to /, send API is running... to client
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)
  // products isn't actually a json file but res.json converts it to be json
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  // req.params.id gets its value from the url
  res.json(product)
})

app.listen(5000, console.log('Server running on port 5000')) // normally "node backend/server" to start server but we have a start script in root package.json
// now we can run our server with just "npm start"
