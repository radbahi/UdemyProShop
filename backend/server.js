import express from 'express' // changed require to import from ecmascript. added "type": "module" to package.json to make it work. docs -> https://nodejs.org/api/esm.html
import dotenv from 'dotenv' // dependency used to separate secrets from your source code. MAKE SURE .env IS IN .gitignore
import products from './data/products.js'

dotenv.config() // this is just reu=quired to be able to run dotenv

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

const PORT = process.env.PORT || 5000 // process.env gets the value of that variable. if not found, default to 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
) // normally "node backend/server" to start server but we have a start script in root package.json
// now we can run our server with just "npm start"

// nodemon and concurrently have been installed as dev dependencies and have scripts you should check out in package.json
