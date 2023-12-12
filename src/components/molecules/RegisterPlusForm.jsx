import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar el formulario
  };

  return (
    <section className="min-h-screen bg-[#f5e5c2] flex flex-col items-center justify-center">
      <div className="mt-10 text-4xl text-center mb-10 md:mt-10 ">Estas a 2 pasos de ser arrendador !!</div>
      <div className="mx-10 mb-10 container h-full p-10 md:w-[1240px] items-center justify-center rounded-xl border border-black shadow-lg">
        <div className="g-6 flex h-full flex-wrap items-center justify-center pt-14">
          <div className="sm:w-[1200px] md:w-[60%] lg:ml-6 lg:w-[50%]">
            <form onSubmit={handleSubmit}>
              {['First Name', 'Last Name', 'Email Address', 'Phone Number'].map((label) => (
                <div key={label} className="relative mb-6">
                  <label htmlFor={label.replace(/\s+/g, '').toLowerCase()} className="mb-3 block">{label}</label>
                  <input
                    type={(label === 'Email Address') ? 'email' : 'text'}  // Cambia el tipo de entrada según la etiqueta
                    id={label.replace(/\s+/g, '').toLowerCase()}  
                    name={label.replace(/\s+/g, '').toLowerCase()}
                    value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                    onChange={handleChange}
                    className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                    placeholder={label}
                  />
                </div>
              ))}

              <Link to="/registerplus/bank">
                <button
                  type="submit"
                  className="my-10 inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Siguiente
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;