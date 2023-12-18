import React from 'react';
import WhatsAppIcon from '../wsp/WhatsApp.jpg'

const ButtonWSP = () => {
  const phoneNumber = '+51994018002'; // Reemplaza esto con el número de teléfono al que quieras enviar el mensaje
  const message = encodeURIComponent('¡Hola, quisiera saber acerca de su propiedad!');

  const handleClick = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="rounded transition-transform duration-300 transform hover:scale-110"
    >
      <img src={WhatsAppIcon} alt="WhatsApp" style={{ width: '60px', marginRight: '5px' }} />
    </button>
  );
};

export default ButtonWSP;
