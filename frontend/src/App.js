import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap' // Container helps with placement.
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <Header />
      {/* py-3 class below gives padding */}
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          {/* the ? in cart screen url makes the id optional */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

// changed App to arrow function per Brad's preference
// deleted entire div that was here from create react app boiler plate
// deleted initial .git folder using command "rm -rf .git". wants git repository in root, not in frontend
// move .gitignore into root
// added "node_modules/" into gitignore because all node modules are going to be in root, which is all of our server dependecies
// added .env to gitignore, too
//https://www.udemy.com/course/mern-ecommerce/learn/lecture/22484732#questions
