import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPlusBank() {
  const [bankData, setBankData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    accountNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar el formulario de RegisterPlusBank
  };

  const handleGoBack = () => {
    // Lógica para manejar el botón "Volver"
    navigate(-1); // Esto navegará hacia atrás en la historia de navegación
  };

  return (
    <section className="min-h-screen bg-[#f5e5c2] flex flex-col items-center justify-center">
      <div className="mt-10 text-4xl text-center mb-10 md:mt-10">Completa tu registro bancario</div>
      <div className="mx-10 mb-10 container h-full p-10 md:w-[1240px] items-center justify-center rounded-xl border border-black shadow-lg">
        <div className="g-6 flex h-full flex-wrap items-center justify-center pt-14">
          <div className="sm:w-[1200px] md:w-[60%] lg:ml-6 lg:w-[50%]">
            <form onSubmit={handleSubmit}>
              {['Card Number', 'Expiration Date', 'CVV', 'Account Number'].map((label) => (
                <div key={label} className="relative mb-6">
                  <label htmlFor={label.replace(/\s+/g, '').toLowerCase()} className="mb-3 block">{label}</label>
                  <input
                    type={(label === 'Card Number' || label === 'CVV' || label === 'Account Number') ? 'password' : 'text'}  // Cambia el tipo de entrada según la etiqueta
                    id={label.replace(/\s+/g, '').toLowerCase()}  
                    name={label.replace(/\s+/g, '').toLowerCase()}
                    value={bankData[label.replace(/\s+/g, '').toLowerCase()]}
                    onChange={handleChange}
                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                    placeholder={label}
                  />
                </div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="my-10 inline-block rounded bg-gray-500 px-5 py-2 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                >
                  Volver
                </button>

                <Link to="/registerplus/final">
                  <button
                    type="submit"
                    className="my-10 inline-block rounded bg-blue-500 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                  >
                    Siguiente
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPlusBank;