import React from 'react'

function Reser_IMG({imagenesAnuncio, sizePorIndex}) {
   

  return (
    <div className='max-w-[1450px] m-auto w-full '>
    <div className='grid sm:grid-cols-5 gap-4'>
    { imagenesAnuncio && imagenesAnuncio.map((imagen,index) => (
        <div className={index === 0 ? 'sm:col-span-3 col-span-2 row-span-2' : ''}>
                <img className='w-full h-full object-cover' src={imagen.fileUri}
                width={sizePorIndex(index).width} height={sizePorIndex(index).height} alt="/"
                />
        </div> 
    ))}

    </div>
</div>
  )
}

export default Reser_IMG