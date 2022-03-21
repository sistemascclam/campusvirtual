import Link from 'next/link'
import React from 'react'

export default function VerificarCorreo() {
  return (
    <div className='flex flex-col mx-auto w-max text-center'>
        Revisa tu correo
        <Link href="/">
        <a className='text-blue-600'>
            Ir a la pag principal
        </a>
        </Link>
    </div>
  )
}
