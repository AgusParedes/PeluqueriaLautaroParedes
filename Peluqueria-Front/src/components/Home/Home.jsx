import React from 'react'
import Foto_Logo from '../../../public/Foto_Logo.png'
import './Home.scss'

const Home = () => {
  return (
    <div className='home__container'>
      <img src={Foto_Logo} alt="Logo" />
      <button className='home__button'>Reservar Turno</button>
    </div>
  )
}

export default Home