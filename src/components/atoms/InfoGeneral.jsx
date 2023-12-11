import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import habi from '../../img/habi.jpg';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} className='h-full'
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          <Typography sx={{height: '100%'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height:'100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Mi alojamiento" {...a11yProps(0)} />
          <Tab label="Mis anuncios" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <div class="grid grid-cols-3 h-full">
            <div className='col-span-1  h-full'>
                <div className='h-full'>
                    <img src={habi} alt=""   class="h-1/2"  />
                 <div className='p-2'>
                    <p className='py-2'>Jr cascanueces 255</p>
                    <p className='py-2'>A 200 metros de TECSUP</p>

                 </div>

                 <div className='text-center'>
                 <button
                                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                    text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 
                                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-center"
                                    data-ripple-light="true">
                                    Ver mapa
                                    </button>
                 </div>

                </div>

            </div>

            <div  className='col-span-2  '>
                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Propietario: </p>
                    <p className='col-span-2 text-center'>Edson Alvarez</p>
                </div>

                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Precio: </p>
                    <p className='col-span-2 text-center'>$250</p>
                </div>

                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Fecha: </p>
                    <p className='col-span-2 text-center'>8/11/2023</p>
                </div>
                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Tiempo: </p>
                    <p className='col-span-2 text-center'>3 meses</p>
                </div>

                <div className='text-center py-5 '>
                 <button
                                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                    text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 
                                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-center"
                                    data-ripple-light="true">
                                    Detalles
                                    </button>
                 </div>
            </div>            
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div class="grid grid-cols-3 h-full">
            <div className='col-span-1  h-full'>
                <div className='h-full'>
                    <img src={habi} alt=""   class="h-1/2"  />
                 <div className='p-2'>
                    <p className='py-2'>Anuncios creados</p>
                    

                 </div>



                </div>

            </div>

            <div  className='col-span-2  '>

                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Precio: </p>
                    <p className='col-span-2 text-center'>$250</p>
                </div>

                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Fecha: </p>
                    <p className='col-span-2 text-center'>8/11/2023</p>
                </div>
                <div className='grid grid-cols-3 px-5 py-2'>
                    <p className='text-2xl font-bold col-span-1'>Tiempo: </p>
                    <p className='col-span-2 text-center'>3 meses</p>
                </div>

                <div className='text-center py-5 '>
                 <button
                                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                    text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 
                                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-center"
                                    data-ripple-light="true">
                                    Detalles
                                    </button>
                 </div>
            </div>            
        </div>
      </CustomTabPanel>

    </Box>
  );
}