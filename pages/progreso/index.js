import Head from 'next/head'
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import Layout, { siteTitle } from "../../components/global/layout";
import { getSession, getCsrfToken } from 'next-auth/react';
import CursoCardCalificar from "../../components/Curso/cursoCardCalificar";
import axios from '@util/Api';
import Image from 'next/image';
export default function Progress() {
    let [_idProgres, _setIdProgres] = useState(null);
    let [dataArray, setDataArray] = useState(null);
    const [cursoObject, setcursoObject] = useState(null)


    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
        setcursoObject(null);
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const loadProgress = async () => {
        const axiosReq = await axios.get(`/api/public/getProgress`);
        const { data } = axiosReq;
        setDataArray(data)
    }

    useEffect(() => {
        loadProgress()
    }, [])

    const handleCalificar = (curso) => {
        setcursoObject(curso);
        setIsOpen(true)
    }

    return (
        <>
            <Layout >
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <div className="min-h-screen">
                    <ModalCalificar cursoObject={cursoObject} isOpen={isOpen}
                        handleCloseModal={closeModal} />
                    <div className='flex flex-col md:flex-row pb-2' >
                        <div className='w-full md:w-3/4'>
                            <div className='text-2xl font-serif font-bold font-mono text-slate-50  '>
                                <div className='w-max pl-1 pr-2 pb-2 border-b-2 border-transparent border-blue-600'>
                                    Mi progreso
                                </div>
                            </div>
                        </div>
                    </div>
                    {dataArray?.length > 0 ?
                        '' :
                        <>
                            <div className="   text-center w-full py-14 border-inherit ">
                                <p className='text-slate-100 text-2xl '>¡Inscríbete en cursos para darles seguimiento!</p>
                            </div>
                        </>
                    }
                    <div className="grid grid-cols-2 gap-x-5">
                        {
                            dataArray?.map((c, ci) =>
                                <div key={`curso_card_${ci}_${c?.curso?.id}`} className="mb-6 relative">
                                    <CursoCardCalificar curso={c.curso} avance={c.advance} handleCalificar={handleCalificar} />
                                    <div className='absolute top-2 right-2' onClick={() => deleteElement(Curso.id)}>
                                        {
                                            c.advance == 100 &&
                                            <p className='font-semibold text-xs bg-green-600 rounded-full px-2 py-1 text-white flex content-center items-center gap-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Completado
                                            </p>
                                        }

                                    </div>
                                </div>
                            )

                        }
                    </div>
                </div>

            </Layout>

        </>

    )
}
const opcionesCalificar = [
    { value: 1, title: "☹ No realmente" },
    { value: 2, title: "🙂 Algo" },
    { value: 3, title: "😄 Sí" },
    { value: 4, title: "🥳 ¡Excedieron!" },
]
const ModalCalificar = ({ cursoObject, isOpen, handleCloseModal }) => {
    const [calification, setcalification] = useState(null)
    const closeModal = () => {
        setcalification(null)
        handleCloseModal()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let conment = e.target[0]?.value
        console.log();
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-cardblue text-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-center text-gray-400"
                                >
                                    Califica el curso
                                    <button onClick={closeModal} className="absolute top-2 right-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dialog.Title>
                                {
                                    calification ?
                                        <form onSubmit={handleSubmit} className="my-6 text-center">
                                            <p>Deja algún comentario final</p>
                                            <textarea className="mt-2 w-full rounded-xl bg-gray-800" autoFocus={true}></textarea>
                                            <button type="submit" className="mt-2 bg-blue-600 rounded-full px-4 py-1 text-md flex ml-auto items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Enviar
                                            </button>
                                        </form>
                                        :
                                        <>
                                            {
                                                cursoObject ?
                                                    <div className="text-center italic my-6 relative">
                                                        <p className="mb-2 text-xl">{cursoObject?.title}</p>
                                                        <Image
                                                            className='rounded-xl h-full w-full shadow-xl'
                                                            src={cursoObject.image}
                                                            alt={cursoObject.title}
                                                            objectFit={"cover"}
                                                            width="200"
                                                            height="200"
                                                        />
                                                    </div> : ""
                                            }
                                            <div className="mt-2">
                                                <p className="text-base font-medium text-center">
                                                    ¿Se cumplieron tus expectativas?
                                                </p>
                                            </div>
                                            <div className="mt-4 flex justify-between flex-wrap">
                                                {
                                                    opcionesCalificar.map((op, i) =>
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={() => setcalification(op.value)}
                                                        >
                                                            {op.title}
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
//No acceder a la ruta si el usuario NO está logeado
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
