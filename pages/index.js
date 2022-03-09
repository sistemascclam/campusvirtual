
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import React, { useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//import { Popover, Transition } from '../node_modules/@headlessui/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

export default function Home() {
  const { data: session } = useSession()
  console.log(session)

  var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>;
  var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>;

  var icon_1 = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-max   text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
  </svg>;

  var icon_2 = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-max text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>;

  var icon_3 = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-max text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>;

  var icon_11 = <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
  </svg>;

  var icon_12 = <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>;

  var icon_13 = <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fuchsia-700" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>;

  var check = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>;

  var heart = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>;

//<Button color="lightBlue" ref={buttonRef} ripple="light" onMouseOver={MouseOut} onMouseOut={MouseOut}>


  return (
    
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="min-h-screen bg-darkblue text-white p-10 w-full ">
      {
          session ?
            <div>
              <b>Hola, {" "} 
                {
                  session.user?.email
                }
              </b>
            </div> : ""
        }
        <div className="  p-4 w-full flex  justify-center ">
          <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-2 " >
            <div className='py-0 lg:py-6'>
              <div className='bg-slate-900 rounded-lg min-h-full'>
                <span className='flex lg:w-64 sm:w-40 xs:w-50 shadow-lg' >
                  <div className="p-4 w-1/3  hidden lg:block rounded-l-xl bg-slate-900">
                    {icon_1}
                  </div>
                  <div className="p-4 w-full text-center rounded-xl lg:rounded-r-xl bg-slate-900 mx-3 ">
                    <span>
                      <span className='block lg:hidden mx-auto text-center lg:mx-0 w-fit'>{icon_11}</span>
                      <b className='text-2xl lg:text-4xl sm:text-2xl'>15</b>
                    </span>
                    <span className='text-xs '>
                      <br />
                      Cursos Iniciados
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div className='py-0 lg:py-6'>
              <div className='bg-slate-900 rounded-lg min-h-full'>
                <span className='flex lg:w-64 sm:w-40 xs:w-50 shadow-lg' >
                  <div className="p-4 w-1/3  hidden lg:block rounded-l-xl bg-slate-900">
                    {icon_2}
                  </div>
                  <div className="p-4 w-full text-center rounded-xl lg:rounded-r-xl bg-slate-900 mx-3">
                    <span  >
                      <span className='block lg:hidden mx-auto text-center lg:mx-0 w-fit'>{icon_12}</span>
                      <b className='text-2xl lg:text-4xl sm:text-2xl'>15</b>
                    </span>
                    <br />
                    <span className='text-xs '>
                      Cursos
                    </span>
                    <span className='text-xs '>
                      &nbsp;Completos
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div className='py-0 lg:py-6'>
              <div className='bg-slate-900 rounded-lg min-h-full'>
                <span className='flex lg:w-64 sm:w-40 xs:w-50 shadow-lg' >
                  <div className="p-4 w-1/3 hidden lg:block rounded-l-xl bg-slate-900">
                    {icon_3}
                  </div>
                  <div className="p-4 w-full text-center rounded-xl lg:rounded-r-xl bg-slate-900 mx-3">
                    <span>
                      <span className='block lg:hidden mx-auto text-center lg:mx-0 w-fit'>{icon_13}</span>
                      <b className='text-2xl lg:text-4xl sm:text-2xl'>300</b>
                    </span>
                    <span className='text-xs'>
                      <br />
                      Minutos Vistos
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-3xl font-serif font-bold font-mono'>
          Qué aprender ahora
        </div>
        <div className='text-xl  py-6 font-bold '>
          Recomendaciones para llevar un curso
        </div>

        <Carousel responsive={responsive} className="  ">
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                    <a>
                    <div  className='bg-slate-900 px-0 '>
                      <img
                          className=' rounded-2xl '
                          src="../images/ejemplo1.JPG"
                          alt="Logo"
                      /> 
                    </div>
                    <div className='py-2 px-3'>
                      <div>
                        <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9, HTML,
                        CSS3 y NodeJS desde cero es otra descripción para lsdkfjsldf </span>
                        <span className='text-xs text-slate-400 leading-5 '>Nicolas Schumman</span>
                      </div>
                      <div className='flex'>
                        <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                      </div>
                      <div className='py-3'>
                        S/<span className='text-base'>157.00</span>
                      </div>
                    </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/ejemplo2.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg  '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>  
                <div className=' bg-slate-900  rounded-2xl  '> 
                <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/ejemplo3.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg  '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/ejemplo1.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg  '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>

                <div className=' bg-slate-900  rounded-2xl  '>
                  <div className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/ejemplo2.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg  '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>  
                <div className=' bg-slate-900  rounded-2xl  '> 
                <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/ejemplo3.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='  rounded-lg'>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>

                <div className=' bg-slate-900  rounded-2xl  '>
                  <div className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/ejemplo1.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='  rounded-lg'>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>

                <div className=' bg-slate-900  rounded-2xl  '>
                  <div className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/ejemplo2.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs'>Aprende Javascript ES9, HTML,
                    CSS3 y NodeJS desde cero</span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='  rounded-lg'>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'>

                <div className=' bg-slate-900  rounded-2xl  '>
                  <div className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/ejemplo3.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs'>Aprende Javascript ES9, HTML,<br />
                      CSS3 y NodeJS desde cero</span>
                    <br /><span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <br />
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </Carousel>
        <div className='text-xl  py-6 font-bold'>
          Porque viste "<span className='text-cyan-400'>Introducción a juegos en 3D en web</span>"
        </div>
        <Carousel responsive={responsive}>
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9 Aprende Javascript ES9, HTML, Aprende Javascript ES9, HTML,   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9 Aprende Javascript ES9, HTML, Aprende Javascript ES9, HTML,   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                      className=' rounded-2xl '
                      src="../images/Captura.JPG"
                      alt="Logo"
                    />
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span>
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> 
          <div className='  rounded-lg '>
            <div className="box-border  p-1  rounded-l-xl   ">
              <div className='mx-auto py-6 p-2'> 
                <div className=' bg-slate-900  rounded-2xl  '>
                  <Link href="/curso">
                  <a>
                  <div  className='bg-slate-900 px-0 '>
                    <img
                        className=' rounded-2xl '
                          src="../images/Captura.JPG"
                        alt="Logo"
                    /> 
                  </div>
                  <div className='py-2 px-3'>
                    <span className='text-xs line-clamp-2 leading-5 h-10'>Aprende Javascript ES9   </span>
                    <span className='text-xs text-slate-400'>Nicolas Schumman</span>
                    <div className='flex'>
                      <span className='text-xs flex text-amber-400'> 4.6 {star_full} {star_full} {star_full} {star_full} {star} </span> <span className='text-xs text-slate-400'>(3.7)</span> 
                    </div>
                    <div className='py-3'>
                      S/<span className='text-base'>157.00</span>
                    </div>
                  </div>
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>  
        </Carousel>
      </div>

    </Layout>
    
  )
}
