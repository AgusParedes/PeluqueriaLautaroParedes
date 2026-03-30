import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home__container'>
      <div className='home__logo'>
        <img src="/Foto_Logo.png" alt="Logo" />
      </div>
      <Link to="/BookingPage">
        <button className='home__button'>Reservar Turno</button>
      </Link>
    </div>
  )
}

export default Home