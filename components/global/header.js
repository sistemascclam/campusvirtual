import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header>
      <div className="mx-auto">
        <nav className="bg-darkblue flex justify-center lg:justify-start items-center  ">
          <button className="buttonlogo left-20" type='button'>
            <div className="logo px-7 p-3 object-cover h-10 w-10 scale-125 ">
              <img className="img" src="public/images/cclamlogotipo.png" width="100">
              </img>
            </div>
          </button>
          <button type="button" className="buton">
            <div className="links px-4 text-white ">
              <ul>
                <li>
                  <a href="#">Categorias</a>
                </li>
              </ul>
            </div>
          </button>
          <div className="box p-5  text-black not-italic rounded-lg relative top-2 bg-[url('/public/images/search-icon.png')] " >
            <input type="text" name='search' placeholder='Buscar en campus CCLAM' className="src text-xl rounded-full  ring-2 px-72 duration-1000 border-transparent"
              autoComplete='off'>
            </input>
          </div>
          <div className="iconos text-white h-6 w-6 right-3/4 justify-between lg:justify-start items-center flex space-x-8  top-10 ">
            <button type="button" className="button" >
              <svg xmlns="http://www.w3.org/2000/svg" className="icono h-7 w-7 right-3/4 justify-between lg:justify-start items-center flex space-x-8  top-10 " viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </button>
            <button type="button" className="button ">
              <svg xmlns="http://www.w3.org/2000/svg" className="icono1 h-7 w-7  right-3/4 flex justify-between lg:justify-start items-center space-x-8  " viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
            <button type="button" className="button ">
              <svg xmlns="http://www.w3.org/2000/svg" className="icono2 h-7 w-7 right-3/4 flex justify-between lg:justify-start items-center space-x-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          {
            session ?
              <button type="button" onClick={() => signOut()} className="text absolute top-7 right-10 text-white bg-purple bg-center bg-cover rounded-full h-9 w-9 font-bold">
                {session.user?.email?.substring(0, 1).toLocaleUpperCase()}
              </button>
              :
              <button type="button" onClick={() => signIn()} className="text absolute top-7 right-10 text-white bg-purple bg-center bg-cover rounded-full h-9 w-9 font-bold">
                Sign in
              </button>
          }
        </nav>
      </div>
    </header>
  )
}

