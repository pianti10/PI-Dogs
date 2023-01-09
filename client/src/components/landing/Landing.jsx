import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom';



const Landing = () => {
  return (
    <Link to= 'home' > 
    <button className='landing-logo'/>
    </Link>
  )
}


export default Landing;