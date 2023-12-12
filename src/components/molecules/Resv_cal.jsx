
import React, {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';



function Resv_Cal() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSelect = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        return {
            name: format(date, 'EEEE'),
            day: format(date, 'dd'),
            month: format(date, 'yyyy'),
        }
    }

    const formattedDate = formatDate(selectedDate)

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeClick = (time) => {
        if (selectedTime == time) {
            setSelectedTime(null);
        } else {
            setSelectedTime(time);
        }
    };

    return (
        <>
            {/* CALENDARIO */}
            <div className='text-center'>
                <p className='py-2 text-[20px] '>Seleccione el dia</p>
                <Calendar 
                    date= {selectedDate} 
                    onChange={handleSelect}
                    className='pb-5'
                />

            {/* EL DIV QUE CONTIENE A LA FECHA Y HORARIOS */}
                <div className='justify-center max-w-2xl mx-auto bg-white rounded-lg border border-black p-6 flex items-center space-x-8 '>

                    {/* CARD DE LA FECHA */}
                    <div className='flex flex-col space-y-2 border-r pr-8'>
                        <p className="text-lg font-semibold mb-2 pb-2">Fecha seleccionada:</p>
                        <div className='w-28 mx-auto bg-white rounded-lg border border-black shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105'>
                            <div className="flex flex-col space-y-2 text-center">
                                <p className="text-gray-700">{formattedDate.name}</p>
                                <p className="text-2xl font-bold">{formattedDate.day}</p>
                                <p className="text-gray-700">{formattedDate.month}</p>
                            </div>
                        </div>
                    </div>

                    {/* LOS TERRIBLES HORARIOS */}
                    <div className='flex flex-col space-y-2'>
                        <p className='text-lg font-semibold pb-2'>Horario:</p>
                        <div className='flex space-x-4'>
                            {/* Aquí puedes agregar varios cuadrados para representar diferentes horas */}
                            {['1:00pm', '2:00pm', '5:00pm', '6:00pm'].map((time) => (
                                <p 
                                    key={time}
                                    className={`${
                                        selectedTime === time ? 'bg-purple-800 text-white' : 'bg-gray-300 text-black'
                                    } rounded-lg py-2 px-3 cursor-pointer hover:bg-purple-800 hover:text-white`}
                                    onClick={() => handleTimeClick(time)}
                                >
                                    {time}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* EL BOTÓN PARA CITA :3 */}
                <button className=" my-10 text-[18px] font-semibold shadow-md bg-[#00df9a] text-black hover:bg-[#00df9a] py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 cursor-pointer">
                    Solicitar Cita
                </button>
            </div>
        </>
    )
}

export default Resv_Cal;