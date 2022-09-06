import Layout, { siteTitle } from '@global/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import axios from '@util/Api';
import Link from 'next/link'
import Video from 'components/Video'
import Lottie from "lottie-react";
import lottieJson from '@animations/medal.json'
import { getCsrfToken, getSession } from 'next-auth/react'

const DoneCard = ({ handleClick, curso }) => {
    return (
        <div className='bg-blue-800 w-max h-max max-w-lg rounded-3xl shadow-md mx-auto py-4 md:py-10 px-3 md:px-10 mt-0 md:mt-4'>
            <p className='font-black text-center text-2xl md:text-3xl mb-3'>CURSO TERMINADO</p>
            <p className='text-center text-lg md:text-xl opacity-80 mb-1 md:mb-2 leading-tight'>Felicitaciones por completar el curso de</p>
            <p className='text-center mb-0 md:mb-1 text-xl md:text-3xl font-bold'>{curso?.title}</p>
            <p className='text-center mb-6 md:mb-10 text-base md:text-lg opacity-90 italic'>por {curso?.name}</p>
            <div className='w-36 mx-auto'>
                <Lottie
                    animationData={lottieJson}
                    loop={false}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice"
                    }}
                />
            </div>
            <button onClick={handleClick} className='mt-10 bg-white hover:-translate-y-1 text-blue-800 font-bold text-center mx-auto p-3 rounded-full flex justify-center items-center gap-1 shadow-xl ml-auto transition-all ease-in-out duration-500'>Ver curso nuevamente</button>
        </div>
    )
}

export default function Leccion() {
    const router = useRouter()
    const { query, isReady } = router
    const { keyword, identificador } = query
    const [showView, setshowView] = useState(false)
    const [leccionData, setleccionData] = useState(null)
    const [forceseeCompleted, setforceseeCompleted] = useState(false)

    const loadCurrentLeccion = async () => {
        const axiosReq = await axios.get(`/api/curso/${keyword}/leccion?identificador=${identificador}`);
        const { data } = axiosReq;
        setleccionData(data)
        setshowView(true)
        router.push(`/curso/${keyword}/leccion?identificador=${data?.leccion?.id}`, undefined, { shallow: true })
    }

    useEffect(() => {
        if (keyword && isReady) {
            setshowView(false)
            loadCurrentLeccion()
        }
    }, [isReady,keyword, identificador])

    const [allowNext, setallowNext] = useState(false)

    const handleOnPassHalfLecture = () => {
        setallowNext(true)
    }

    const handleOnLessThanHalfLecture = () => {
        setallowNext(false)
    }

    const handleAllowNext = async () => {
        let ide = leccionData?.curso?.lecciones?.find(l => l?.orden == (leccionData?.leccion?.orden + 1))?.id
        if (leccionData?.progress?.advance != 100 || leccionData?.leccion?.orden > leccionData?.progress?.leccion?.orden) {
            if (allowNext) {
                await axios.post(`/api/curso/${keyword}/leccion/action`, {
                    progressId: leccionData?.progress?.id,
                    newlection: leccionData?.leccion?.id,
                });
            }
        }
        router.push(`/curso/${keyword}/leccion?identificador=${ide}`)
    }

    return (
        <Layout widthPaddingX={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            {
                showView ?
                <div className="min-h-screen text-white w-full pb-6 px-3 md:px-10">
                    <Transition
                        show={leccionData?.progress?.advance == 100 && !forceseeCompleted}
                        enter="transition-all duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-all duration-0"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="w-full h-full flex"
                    >
                        <DoneCard handleClick={setforceseeCompleted} curso={leccionData?.curso} />
                    </Transition>
                    {
                        leccionData?.progress?.advance == 100 && !forceseeCompleted ?
                            "" :
                            <div className='flex flex-wrap md:flex-nowrap justify-between gap-4'>
                                <div className='w-full md:w-9/12'>
                                    {
                                        leccionData?.leccion?.url ?
                                            <Video src={leccionData?.leccion?.url} handleLessThanSixty={handleOnLessThanHalfLecture} handleOnSixty={handleOnPassHalfLecture} handleOnEnd={handleAllowNext} />
                                            : ""
                                    }
                                    <div className='w-full rounded-2xl flex flex-col justify-center mt-4 px-2 mb-6'>
                                        <p className='text-2xl font-semibold'>
                                            {leccionData?.leccion?.title}
                                        </p>
                                        <p className='text-lg font-light text-gray-200 mt-1'>
                                            {leccionData?.curso?.name}
                                        </p>
                                    </div>
                                    <div className='flex justify-between px-3 md:px-0'>
                                        {
    
                                            leccionData?.curso?.lecciones.some(l => l.orden < leccionData?.leccion?.orden) ?
                                                <Link href={`/curso/${keyword}/leccion?identificador=${leccionData?.curso?.lecciones?.find(l => l?.orden == (leccionData?.leccion?.orden - 1))?.id}`}>
                                                    <a className='md:text-base bg-blue-600 hover:bg-blue-800 w-34 md:w-40 px-3 py-2 md:p-3 rounded-full flex justify-center items-center gap-1 shadow-xl mr-auto'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                                        </svg>
                                                        Anterior
                                                    </a>
                                                </Link> : ""
                                        }
                                        {
                                            <button
                                                onClick={handleAllowNext}
                                                className={`${allowNext || leccionData?.progress?.advance == 100 || leccionData?.leccion?.orden < leccionData?.progress?.leccion?.orden ? 'hover:bg-blue-800' : 'opacity-40 cursor-not-allowed'} 
                                                    md:text-base bg-blue-600 w-34 md:w-40 px-3 py-2 md:p-3 rounded-full flex justify-center items-center gap-1 shadow-xl ml-auto transition-all ease-in-out duration-300`}>
                                                {
                                                    leccionData?.curso?.lecciones?.some(l => l.orden > leccionData?.leccion?.orden) ?
                                                        <>
                                                            Siguiente
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </>
                                                        :
                                                        "Terminar"
                                                }
    
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div className='w-full md:w-3/12 px-3 md:px-0'>
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="bg-cardblue focus:outline-none flex items-center w-full justify-between rounded-2xl shadow-lg bg-purple-100 px-3 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-200 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
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
                                                <Disclosure.Panel className="mt-2 p-4 text-base text-gray-200 bg-cardblue rounded-2xl shadow-lg">
                                                    {
                                                        leccionData?.leccion?.helpers?.length == 0 ? <p className='italic text-sm text-center'>No hay extras</p> : ""
                                                    }
                                                    {
                                                        leccionData?.leccion?.helpers?.map((h, hi) =>
                                                            <p className='mb-2' key={hi}><a href={h.url} className='text-blue-400 hover:text-blue-500 underline'>{h.title}</a></p>
                                                        )
                                                    }
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </div>
                    }
                </div> : ""
            }

        </Layout>
    )
}

//No acceder a la ruta si el usuario no está logeado
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
