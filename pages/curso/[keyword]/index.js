import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import Layout, { siteTitle } from '@global/layout';
import axios from '@util/Api';
import calification from "constants/calification.json"
import moment from "moment";
import 'moment/locale/es';
import { actionFavorites, actionShopingCart } from '@cursoCards/actionCurso';
import { useContext } from 'react';
import AppContext from 'components/AppContext';
import { promiseToast } from '@util/helper';
moment.locale('es')

const habilidades = [
    "Fotografía",
    "Fotografía digital",
    "Compras en grupo",
    "Creativa",
    "Programación",
    "HTML",
    "Coding",
]

export default function Curso() {
    const router = useRouter()
    const {query,isReady} = router
    const { keyword } = query
    const [arrayDC, setarrayDC] = useState(null)
    const { data: session, status } = useSession()
    const [btnInscription, _setBtnInscription] = useState('Inscribirse ahora')

    const loadCurso = async () => {
        const axiosReq = await axios.get(`/api/curso/${keyword}`);
        const { data } = axiosReq;
        setarrayDC(data)
    }

    useEffect(() => {
        if (isReady && keyword) {
            loadCurso()
        }
    }, [isReady,keyword])

    const changeStatus = () => {
        if(arrayDC.progress.length==0){
            promiseToast(axios.post(`/api/public/addProgress/` + arrayDC.id), () => loadCurso(),null,'¡Te inscribiste con éxito!')
        }else{
            router.push(`/curso/${keyword}/leccion`)
        }
    }

    var cadena = '';
    if (arrayDC != null) {
        var cadena = arrayDC.texto?.split('|,|')
    }

    const value = useContext(AppContext);
    let { setlocalStorageData } = value
    let { localStorageData } = value.state;

    const handleActionFavorites = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let add = arrayDC.favorites.length==0
        actionFavorites(
            arrayDC.id,
            add,
            session, status,
            () => loadCurso(),
            localStorageData,
            setlocalStorageData
        )
    }

    const handleActionShopingCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let add = arrayDC.shopingCarts.length==0

        actionShopingCart(
            arrayDC.id,
            add,
            session, status,
            () => loadCurso(),
            localStorageData,
            setlocalStorageData
        )
    }

    return (
        <Layout widthPadding={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            {arrayDC ?
                <div className="absolute inset-x-0 h-[550px] z-0">
                    <div className="relative w-full h-full">
                        <Image
                            className='h-full w-full opacity-20'
                            src={arrayDC.image}
                            alt={"header-curso"}
                            objectFit={"cover"}
                            layout="fill"
                            objectPosition={"center"}
                        />
                        <div className='h-36 inset-x-0 absolute top-0 shadow-inner bg-gradient-to-t from-transparent to-[#04081f]'></div>
                        <div className='h-96 inset-x-0 absolute bottom-0 shadow-inner bg-gradient-to-b from-transparent to-[#04081f]'></div>
                    </div>
                </div>
                : ""
            }
            <div className="min-h-screen text-white w-full px-2 md:px-10 max-w-7xl mx-auto pt-28 relative">
                {arrayDC ?
                    <>
                        <div className='lg:flex xl:flex gap-6 relative'>
                            <div className="text-white relative w-80 lg:w-5/12">
                                <Image
                                    className='h-full rounded-2xl'
                                    src={arrayDC.image}
                                    layout="fill"
                                    objectFit='cover'
                                    objectPosition="center"
                                />
                            </div>
                            <div className="text-white lg:w-6/12 w-full">
                                <div className='py-2 px-3 '>
                                    <span className='text-3xl font-extrabold'>{arrayDC.title}</span><br />
                                    <span className='text-lg text-slate-400'>por {arrayDC.name}</span>
                                    <div className='flex py-2 items-center'>
                                        <span className='text-base text-white my-auto font-semibold'>{arrayDC?.calificaciones?.length} opiniones</span>
                                    </div>
                                    <span className='text-slate-100 py-5 block text-lg'>
                                        {arrayDC.description}
                                    </span>
                                    {
                                        cadena &&
                                        <p className='text-sm font-semibold mb-2'>Lo que aprenderás:</p>
                                    }
                                    {cadena?.map((Array, sec_k) => (
                                        <div className='py-0 text-sm' key={sec_k}>
                                            <div className='py-1'>{check} {Array}</div>
                                        </div>
                                    ))}

                                    {arrayDC.price != 0 && arrayDC.price != null ?
                                        <>
                                            <div className="flex items-center justify-between py-5">
                                                <div className='w-full'>
                                                    {
                                                        <button type="button" className="bg-blue-600 hover:bg-blue-600 text-white text-sm py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline" onClick={handleActionShopingCart}>
                                                            {arrayDC.shopingCarts.length > 0 && arrayDC.shopingCarts.every(c => c.active == true) ? 'Quitar de la cesta' : 'Añadir a la cesta'}
                                                        </button>
                                                    }
                                                </div>
                                                <div className='w-1/6  px-1 '>
                                                    {
                                                        <div className='  border-solid border-2 border-slate-600 py-2 rounded-lg' onClick={handleActionFavorites}>
                                                            <button className="block   mx-auto text-center   w-fit">
                                                                {arrayDC.favorites.length > 0 && arrayDC.favorites.every(c => c.active == true) ? heart_full : heart}
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='block py-3 px-2  text-center rounded-lg  border-solid border-2 border-slate-600'>
                                                Comprar ahora
                                            </div>
                                        </> :
                                        <>
                                            <div className='py-4'>
                                                {(session && status != 'loading')?
                                                    <button type="button" className=" font-extrabold text-xl bg-blue-600 hover:bg-blue-700 text-white   py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline"
                                                        onClick={changeStatus}>
                                                            {arrayDC.progress.length==0 ? 'Inscribirse ahora' : 'Ir al curso'}
                                                    </button> :
                                                    <Link href="/registro">
                                                        <a className="flex justify-center font-extrabold text-xl bg-blue-600 hover:bg-blue-700 text-white   py-3 px-4 rounded-lg  focus:outline-none focus:shadow-outline" >
                                                            Inscribirse ahora
                                                        </a>
                                                    </Link>
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="shadow">
                        <div className="animate-pulse flex gap-6">
                            <div className="rounded-xl bg-slate-700 w-80 lg:w-5/12"></div>
                            <div className="flex-1 lg:w-6/12 w-full space-y-6 py-1">
                                <div className="h-5 bg-slate-700 rounded"></div>
                                <div className="h-2 bg-slate-700 rounded w-52"></div>
                                <div className="h-2 bg-slate-700 rounded w-36"></div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="block text-white py-4 w-full mt-10">
                    <div className='py-0 mb-8'>
                        <p className='text-2xl font-semibold mb-6 lg:mb-3'>Habilidades relacionadas</p>
                        <div className='flex flex-wrap gap-3'>
                            {
                                habilidades.map((h, k) =>
                                    <div key={k} className="bg-slate-800 px-3 py-1 rounded">
                                        {h}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='py-0 mt-10 sm:mt-0'>
                        <p className='text-2xl font-semibold mb-6 lg:mb-3'>Calificaciones de estudiantes</p>
                        {
                            <div className="gap-3 bg-slate-900 w-max mt-4 mb-6 pt-4 px-4 pb-1 shadow-lg rounded-xl">
                                <p className='text-center font-medium text-lg'>¿Se cumplieron tus expectativas?</p>
                                <div className='py-0 lg:py-6'>
                                    {
                                        calification.map((ca, sk) => <div key={sk} className="flex items-center gap-4 mb-1">
                                            <div className='text-right w-28'>
                                                {ca.name}
                                            </div>
                                            <div className="rounded-md h-4 bg-gray-700 w-36 lg:w-72">
                                                <div className="bg-blue-600 h-4 rounded-md" style={{ width: `${arrayDC?.calificaciones?.length > 0 ? (100 * (arrayDC?.calificaciones?.filter(c => c.star == ca.id).length / arrayDC?.calificaciones?.length)) : 0}%` }}></div>
                                            </div>
                                            <div className='flex content-center items-center text-white'>
                                                <span className='text-slate-300 ml-2'>
                                                    {
                                                        arrayDC?.calificaciones?.length > 0 ?
                                                            `${100 * (arrayDC?.calificaciones?.filter(c => c.star == ca.id).length / arrayDC?.calificaciones?.length)}%`
                                                            :
                                                            "0%"
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='py-0 mt-10 sm:mt-0'>
                        <p className='text-2xl font-semibold mb-6 lg:mb-3'>Comentarios</p>
                        {
                            arrayDC?.calificaciones?.length > 0 ?
                                <>
                                    {
                                        arrayDC?.calificaciones?.map((cal, cal_key) =>
                                            <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 bg-slate-900 mb-4 rounded-xl max-w-4xl p-5" key={cal_key} >
                                                <div className='w-14'>
                                                    <div className="w-10 h-10 rounded-full">
                                                        {
                                                            cal?.user?.image ?
                                                                <img
                                                                    className='rounded-full h-full '
                                                                    src={cal?.user?.image}
                                                                    alt="Logo"
                                                                />
                                                                :

                                                                <img
                                                                    className='rounded-full h-full '
                                                                    src="../images/ejemplo2.JPG"
                                                                    alt="Logo"
                                                                />
                                                        }
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <div className='flex flex-col'>
                                                        <p className='pb-2 font-semibold'>{cal?.user?.name ?? cal?.user?.email}</p>
                                                        <p className=' text-gray-300 text-lg'>Este curso <span className='font-black'>{calification.find(c => c.id === cal.star).description}</span> mis expectativas.</p>
                                                        <div className='h-0.5 w-full bg-gray-700 my-4 rounded-full'></div>
                                                        <p>{cal?.description}</p>
                                                    </div>
                                                    <div className='block py-2 text-slate-400 text-right text-sm'>
                                                        {moment(cal.registration_date).calendar()}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <p className='text-lg italic text-gray-400'>Sin comentarios</p>
                        }
                    </div>
                </div>
            </div>

        </Layout>

    )
}

var heart = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>;
var heart_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
</svg>;
var check = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
</svg>;