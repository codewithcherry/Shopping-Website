import React from 'react'
import Navbar from '../components/Navigation/Navbar'
import SignupForm from '../components/Authentication/Signup/SignupForm'
import Footer from '../components/Footer/Footer'

const Signup = () => {
  return (
    <div>
        <Navbar />
        <SignupForm />
        <Footer />
    </div>
  )
}

export default Signup
