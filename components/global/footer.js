import React from 'react'

export default function Footer() {
    return (
        <footer className='text-white bg-footer py-12 mt-12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-10 lg:px-20'>
                <div>
                    <p className='font-bold'>Contáctanos</p>
                    <ul className='text-gray-300 mt-2'>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>
                </div>
                <div>
                    <p className='font-bold'>Contáctanos</p>
                    <ul className='text-gray-300 mt-2'>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>
                </div>
                <div>
                    <p className='font-bold'>Contáctanos</p>
                    <ul className='text-gray-300 mt-2'>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>
                </div>
            </div>
            {/* <div className='text-center mt-12 pb-4 leading-none'>
                <a href='https://cclam.org.pe/' target='_blank' referrerPolicy='no-referrer' className='text-sm text-gray-300 hover:text-white'>Por Cámara de Comercio y Producción de Lambayeque</a>
            </div> */}
        </footer>
    )
}
