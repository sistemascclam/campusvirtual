import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <footer className='text-white bg-footer py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-10 lg:px-20'>
                <div className='mb-6 md:mb-0'>
                    <p className='font-bold'>Más Información</p>
                    <ul className='text-gray-300 mt-2'>
                        <li className='flex items-center gap-2 mt-4 mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <a className='hover:text-blue-600  transition-all ease-in-out duration-150' href='https://goo.gl/maps/g4fxXKK3BcytScgG6' target={'_blank'} rel="noreferrer">
                                Términos y Condiciones
                            </a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            <a className='hover:text-blue-600  transition-all ease-in-out duration-150' href='https://goo.gl/maps/g4fxXKK3BcytScgG6' target={'_blank'} rel="noreferrer">
                                Libro de reclamaciones
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <p className='font-bold'>Paga aquí con</p>
                    <ul className='text-gray-300 mt-2'>
                        <span>
                            <Image
                                src={"/images/tarjetas.svg"}
                                width="192"
                                height="33"
                            />
                        </span>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <p className='font-bold'>Contáctanos</p>
                    <ul className='text-gray-300 mt-2'>
                        <li className='flex items-center gap-2 mt-4 mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <a className='hover:text-blue-600 transition-all ease-in-out duration-150' href="tel:51944680147" target="_blank" rel="noreferrer">
                                +51944680147
                            </a>
                        </li>
                        <li className='flex items-center gap-2 mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <a className='hover:text-blue-600 transition-all ease-in-out duration-150' href="mailto:secretariagerencia@cclam.org.pe" target="_blank" rel="noreferrer">secretariagerencia@cclam.org.pe</a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <a className='hover:text-blue-600 transition-all ease-in-out duration-150' href='https://goo.gl/maps/g4fxXKK3BcytScgG6' target={'_blank'} rel="noreferrer">
                                María Izaga 035. Lambayeque, Chiclayo.
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className='text-center mt-12 pb-4 leading-none'>
                <a href='https://cclam.org.pe/' target='_blank' referrerPolicy='no-referrer' className='text-sm text-gray-300 hover:text-white'>Por Cámara de Comercio y Producción de Lambayeque</a>
            </div> */}
        </footer>
    )
}
