
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Carousel from 'components/Carousel'
import useSWR from 'swr'

export default function Home() {
  const { data: session, status } = useSession()
  const { data: arrayC } = useSWR('/api/curso', (...args) => fetch(...args).then(res => res.json()))
  const { data: arrayF } = useSWR('/api/favorites', (...args) => fetch(...args).then(res => res.json()))
  const { data: arraySC } = useSWR('/api/shopingcart', (...args) => fetch(...args).then(res => res.json()))
  const { data: arrayDashboard } = useSWR('/api/dashboard', (...args) => fetch(...args).then(res => res.json()))

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="min-h-screen text-white w-full">
        {
          status !== 'loading' && session ?
            <div>
              <b>Hola, {" "}
                {
                  session.user?.name ?? session.user?.email
                }
              </b>
            </div> : ""
        }
        {
          status !== 'loading' && session && arrayDashboard ?
            <div className="grid grid-cols-3 justify-center py-3 gap-3 md:gap-x-6 max-w-5xl mx-auto" >
              <CardDashboard
                icon={
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                }
                indicator={arrayDashboard?.inscritos ?? 0}
                description="Cursos Inscritos"
              />
              <CardDashboard
                icon={
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                }
                indicator={arrayDashboard?.completados ?? 0}
                description="Cursos Completados"
              />
              <CardDashboard
                icon={
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                }
                indicator={arrayDashboard?.minCompletados ?? 0}
                description="Minutos Completados"
              />
            </div>
            : ""
        }
        <div className=' text-3xl font-serif font-bold font-mono mt-6'>
          Eleva tu nivel de cero a experto
        </div>
        <div className='text-xl  pt-6 pb-5 font-bold'>
          Recomendaciones para llevar un curso
        </div>
        <Carousel array={arrayC} options={true} />
        <div className='text-xl  mt-12 pt-6 pb-5 font-bold'>
          Porque viste {'"'}<span className='text-blue-500'>Administración de Negocios</span>{'"'}
        </div>
        <Carousel array={arrayC} options={true} />
      </div>
    </Layout>
  )
}

const CardDashboard = ({ icon, indicator, description }) =>
  <div className='rounded-xl bg-blue-800 bg-opacity-5 p-3 shadow-xl'>
    <div className='flex gap-6 justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-20 w-20 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
        {icon}
      </svg>
      <div className='flex flex-col text-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="block md:hidden mb-1 mx-auto h-10 w-10 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
          {icon}
        </svg>
        <p className='text-2xl lg:text-4xl sm:text-2xl'>{parseInt(indicator)}</p>
        <p className='text-xs md:text-sm mt-1 md:mt-0'>{description}</p>
      </div>
    </div>
  </div>