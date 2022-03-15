
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import React from 'react'; 
import { useSession } from 'next-auth/react';
import useSWR from 'swr'
import CarouselCurso from 'components/curso/carouselCurso'
 
export default function Home() {
  const { data: session } = useSession()
  const   dataC  = useSWR('/api/public/curso', (...args) => fetch(...args).then(res => res.json())) 
  var arrayC = dataC.data

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
        {
          session ?
            <div className="w-full flex justify-center mb-10">
              <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 " >
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
            : ""
        }
        <div className=' text-3xl font-serif font-bold font-mono'>
        Aprende de cero a experto
        </div>
        <div className='text-xl  py-6 font-bold '>
          Recomendaciones para llevar un curso
        </div>
        <CarouselCurso arrayC={arrayC}/> 

        <div className='text-xl  py-6 font-bold'>
          Porque viste "<span className='text-cyan-400'>Introducción a juegos en 3D en web</span>"
        </div>
        <CarouselCurso arrayC={arrayC}/> 
      </div>
    </Layout>

  )
}
