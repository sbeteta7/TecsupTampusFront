import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPlusFinal() {
  const [finalData, setFinalData] = useState({
    dniNumber: '',
    dniImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFinalData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFinalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar el formulario de RegisterPlusFinal
    // Puedes realizar la lógica de envío de datos aquí
    // Después, puedes navegar a la página RegisterPlusComplete
    navigate('/registerplus/complete');
  };

  const handleGoBack = () => {
    // Lógica para manejar el botón "Volver"
    navigate(-1); // Esto navegará hacia atrás en la historia de navegación
  };

  return (
    <section className="min-h-screen bg-[#f5e5c2] flex flex-col items-center justify-center">
      <div className="mt-10 text-4xl text-center mb-10 md:mt-10">Estas a 1 paso de ser arrendador !!</div>
      <div className="mx-10 mb-10 container h-full p-10 md:w-[1240px] items-center justify-center rounded-xl border border-black shadow-lg">
        <div className="g-6 flex h-full flex-wrap items-center justify-center pt-14">
          <div className="sm:w-[1200px] md:w-[60%] lg:ml-6 lg:w-[50%]">
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <label htmlFor="dniNumber" className="mb-3 block">Número de DNI</label>
                <input
                  type="text"
                  id="dniNumber"
                  name="dniNumber"
                  value={finalData.dniNumber}
                  onChange={handleChange}
                  className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                  placeholder="Número de DNI"
                />
              </div>

              <div className="relative mb-6">
                <label htmlFor="dniImage" className="mb-3 block">Subir foto del DNI</label>
                <input
                  type="file"
                  id="dniImage"
                  name="dniImage"
                  onChange={handleChange}
                  accept="image/*"
                  className="peer block min-h-[auto] w-full rounded bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mt-5  object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="my-10 inline-block rounded bg-gray-500 px-5 py-2 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                >
                  Volver
                </button>

                <button
                  type="submit"
                  className="my-10 inline-block rounded bg-green-500 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-md dark:shadow-xl dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPlusFinal;