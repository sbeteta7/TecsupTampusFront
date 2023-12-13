import React from 'react'

function Reser_IMG() {
  return (
    <div className='max-w-[1450px] m-auto w-full '>
        <div className='grid sm:grid-cols-5 gap-4'>
            <div className='sm:col-span-3 col-span-2 row-span-2'>
                <img className='w-full h-full object-cover' src="https://picsum.photos/1240/600" alt="/" />
            </div>
            <div>
                <img className='w-full h-full object-cover' src="https://picsum.photos/800/600" alt="/" />
            </div>
            <div>
                <img className='w-full h-full object-cover' src="https://picsum.photos/1240/600" alt="/" />
            </div>
            <div>
                <img className='w-full h-full object-cover' src="https://picsum.photos/1080/800" alt="/" />
            </div>
            <div>
                <img className='w-full h-full object-cover' src="https://picsum.photos/1920/1080" alt="/" />
            </div>
        </div>
    </div>
  )
}

export default Reser_IMG