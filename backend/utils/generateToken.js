import jwt from 'jsonwebtoken' //library for generating authentication tokens

const generateToken = (id) => {
  // takes in a userid that we add as a payload to the token
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
  // the id gets passed in as an object, the secret gets passed in as a 2nd argument, and an optional expiration time as a 3rd object argument
}

export default generateToken
