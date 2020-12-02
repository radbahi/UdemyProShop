import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart //we're checking to see if shippingAddress is already in the state and then populating below

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      {/* CheckoutSteps is what gives us those links at the top of checking out */}
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}></Form>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='address'
          placeholder='Enter address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>s
        <Form.Control
          type='city'
          placeholder='Enter city'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='postalCode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='postalCode'
          placeholder='Enter Postal Code'
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='country'
          placeholder='Enter country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </FormContainer>
  )
}

export default ShippingScreen
