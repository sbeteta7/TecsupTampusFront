import React from 'react'
import Header from "../organisms/Header";
import Resv_Cal from '../molecules/Resv_cal';
import Reser_IMG from '../molecules/Reser_IMG';

const Reservas = () => {
  return (
    <>
        <div>
          
            <Header />

            <p className='text-center font-semibold text-[30px] py-6'>Genera tu cita</p>
            <Resv_Cal />
            <Reser_IMG />
        </div>
    </>
  )
}

export default Reservas