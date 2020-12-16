import express from 'express' // changed require to import from ecmascript. added "type": "module" to package.json to make it work. docs -> https://nodejs.org/api/esm.html
import dotenv from 'dotenv' // dependency used to separate secrets from your source code. MAKE SURE .env IS IN .gitignore
import path from 'path' //path is a nodejs module to work with file paths
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config() // this is just required to be able to run dotenv

connectDB()

const app = express()

app.use(express.json()) // allows us to accept json data in the body

// if we get a GET request to /, send API is running... to client
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//PayPal route. This is for making the actual payment.
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve() //mimic actual __dirname to work with es6 syntax
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //this makes the uploads folder static. important for images.

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000 // process.env gets the value of that variable. if not found, default to 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
) // normally "node backend/server" to start server but we have a start script in root package.json
// now we can run our server with just "npm start"

// nodemon and concurrently have been installed as dev dependencies and have scripts you should check out in package.json
// mongodb compass has /proshop instead of /test in the end of the connection url
