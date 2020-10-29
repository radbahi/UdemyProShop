import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap' // Container helps with placement.

const App = () => {
  return (
    <>
      <Header />
      {/* py-3 class below gives padding */}
      <main className='py-3'>
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
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
