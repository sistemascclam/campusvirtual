import Link from 'next/link'
import React from 'react'

export default function VerificarCorreo() {
  return (
    <main className='bg-darkblue min-h-screen flex items-center justify-center'>
      <img className="h-80 w-96" src="../images/3d-fluency-blue-paper-plane.png" />
      <div className='text-white'>
        <p className='font-bold text-3xl'>Revisa tu bandeja de entrada</p>
        <p className='text-lg py-1'>Un link de inicio de secion se ha enviado a tu direccion de correo.</p>
        <Link href="/">
          <a className="bg-blue-600 hover:bg-blue-700 rounded-full py-2 px-4 text-white text-lg mt-2 flex gap-2 w-max items-center">
            Ir a la pagina principal
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </Link>
      </div>
    </main>
  )
}
