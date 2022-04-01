import Link from 'next/link'
import React from 'react'

export default function VerificarCorreo() {
  return (
<<<<<<< HEAD
    <body className='bg-darkblue flex bg-local'>
     <div class="md:flex md: mx-auto">
      <div class="md:shrink-0 ">
       <img class="h-60 w-80 md:h-full md:w-96 relative top-5 md:top-48 left-20 md:left-52" src="../images/3d-fluency-blue-paper-plane.png" />
      </div>

       <div class="p-20 ">
         <div class="tracking-wide text-white font-bold text-2xl relative left:20 md:left-36 top-0.5 md:top-36"> Revisa tu bandeja de entrada</div>
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
=======
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
>>>>>>> 434e4ff25a11135637a119c38e9740c6a8bc5e50
  )
}
