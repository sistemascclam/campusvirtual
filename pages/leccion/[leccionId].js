import Layout, { siteTitle } from '@global/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { Disclosure } from '@headlessui/react'

export default function Leccion() {
    const router = useRouter()
    const { leccionId } = router.query

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="  min-h-screen text-white w-full">
                <div className='flex justify-between gap-4'>
                    <div className='w-9/12'>
                        <video className='w-full rounded-2xl shadow-xl' controls>
                            <source src="/videos/videoprueba.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className='w-full rounded-2xl flex flex-col justify-center mt-4 px-2 mb-6 shadow-lg'>
                            <p className='text-2xl font-semibold'>
                                1. Hacking Ético Avanzado. Prácticas en Kali Linux. Retos CTF.-
                            </p>
                            <p className='text-lg font-light text-gray-200 mt-1'>
                                Alvaro Chirou
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <button className='bg-blue-600 hover:bg-blue-800 w-40 p-3 rounded-full flex justify-center items-center gap-1 shadow-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Anterior
                            </button>
                            <button className='bg-blue-600 hover:bg-blue-800 w-40 p-3 rounded-full flex justify-center items-center gap-1 shadow-xl'>
                                Siguiente
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='w-3/12'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="bg-slate-800 focus:outline-none flex items-center w-full justify-between rounded-2xl bg-purple-100 px-4 py-3 text-left text-lg font-medium text-purple-900 hover:bg-purple-200 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <p className='flex items-center gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                            </svg>
                                            Extras
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className={`${open ? 'transition-all duration-300 ease-in-out rotate-90 transform' : ''
                                                } h-6 w-6 text-purple-500`}
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="mt-2 p-4 text-base text-gray-200 bg-slate-800 rounded-2xl ">
                                        <p className='mb-2'>De la leccion {leccionId} : <a href='https://www.youtube.com/watch?v=cRFMlGqB6tM' className='text-blue-400 hover:text-blue-500 underline'>Video original</a></p>
                                        <p className='mb-2'>De la leccion {leccionId} : <a href='https://www.youtube.com/watch?v=cRFMlGqB6tM' className='text-blue-400 hover:text-blue-500 underline'>Video original</a></p>
                                        <p className='mb-2'>De la leccion {leccionId} : <a href='https://www.youtube.com/watch?v=cRFMlGqB6tM' className='text-blue-400 hover:text-blue-500 underline'>Video original</a></p>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

//videoprueba.mp4