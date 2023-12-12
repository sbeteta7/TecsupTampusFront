import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom';
import RegisterPlusBank from '../molecules/RegisterPlusBank';
import RegisterPlusForm from '../molecules/RegisterPlusBank';
import RegisterPlusFinal from '../molecules/RegisterPlusFinal';
import RegisterPlusComplete from '../molecules/RegisterPlusComplete';


function RegisterPlus() {
    return (
      <div className="">
        <Outlet />
        <Routes>
            <Route path="form" element={<RegisterPlusForm />} />
            <Route path="bank" element={<RegisterPlusBank />} />
            <Route path="final" element={<RegisterPlusFinal />} />
            <Route path="complete" element={<RegisterPlusComplete />} />
        </Routes>
      </div>
    );
  }

export default RegisterPlus