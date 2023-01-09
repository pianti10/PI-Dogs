import React from 'react'
import './createBreedsButton.css'
import { Link } from 'react-router-dom';

export const CreateBreedsButton = () => {
  return (
    <Link to ='breeds' >
    <div className='button-container'>
        <button className='BreedButton'>Create Breed</button>
    </div>
    </Link>
  )
}
