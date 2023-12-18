import React from 'react'
import { Route, Routes, Outlet} from 'react-router-dom';
import RegisterPlusForm from '../molecules/RegisterPlusForm';
import RegisterPlusFinal from '../molecules/RegisterPlusFinal';
import RegisterPlusComplete from '../molecules/RegisterPlusComplete';


function RegisterPlus() {
    return (
      <div className="">
        {/* SECCIÓN DE LOS LINKS --- NO TOCAR! */}
        <Outlet />
        <Routes>
            <Route path="form" element={<RegisterPlusForm />} />
            <Route path="final" element={<RegisterPlusFinal />} />
            <Route path="complete" element={<RegisterPlusComplete />} />
        </Routes>
      </div>
    );
  }

export default RegisterPlus