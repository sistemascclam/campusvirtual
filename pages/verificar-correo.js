import Link from 'next/link'
import React from 'react'

export default function VerificarCorreo() {
  return (
    <body className='bg-darkblue flex bg-local'>
     <div className="md:flex md: mx-auto">
      <div className="md:shrink-0 ">
       <img className="h-60 w-80 md:h-full md:w-96 relative top-5 md:top-48 left-20 md:left-52" src="../images/3d-fluency-blue-paper-plane.png" />
      </div>

       <div className="p-20 ">
         <div className="tracking-wide text-white font-bold text-2xl relative left:20 md:left-36 top-0.5 md:top-36"> Revisa tu bandeja de entrada</div>
           <div className='tracking-wide text-white relative left:20 md:left-36 top-5 md:top-40 py-2'>Un link de inicio de secion se ha enviado a
             <br/>tu direccion de correo.</div>
               <Link href="/">
                <button className="bg-blue-600 w-72 h-10 md:h-25 md:w-96 rounded-full relative top-10 md:top-52 left:20 md:left-36">
                 <a className='text-white text-xl tracking-wide'>
                   Ir a la pagina principal
                   </a>
               </button>
              </Link>
       </div>
    </div>
 </body>
  )
}
