import Link from 'next/link'
import React from 'react'

export default function VerificarCorreo() {
  return (
    <body className='bg-darkblue'>
      <div className='flex flex-col mx-auto'>
        <div className='tracking-wide l left-1/2 text-white font-bold py-8 absolute top-36 text-2xl'>
          Revisa tu bandeja de entrada
        </div>
        <div className='tracking-wide  text-white left-1/2 py-14 absolute top-40'>Un link de inicio de secion se ha enviado a
          <br />tu direccion de correo.</div>

        <Link href="/">
          <button className="bg-blue-600 w-72 h-10 rounded-full absolute top-1/2 left-1/2">
            <a className='text-white text-xl tracking-wide'>
              Ir a la pagina principal
            </a>
          </button>
        </Link>

        <img className=" w-96 h-90 relative left-52 absolute top-36" src='../images/3d-fluency-blue-paper-plane.png'>
        </img>
      </div>
    </body>
  )
}
