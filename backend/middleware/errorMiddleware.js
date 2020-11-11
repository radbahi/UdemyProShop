const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// below is a custom error handling middleware. middleware is a function that has access to req/res cycle.
const errorHandler = (err, req, res, next) => {
  // sometimes we get an error even if the status code is 200 which is why we have the ternary statement below to turn it into 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  }) // if environment is in production, don't define stack. we only need stack in development.
}

export { notFound, errorHandler }
