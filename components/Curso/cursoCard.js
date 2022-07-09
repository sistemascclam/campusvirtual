import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import axios from '@util/Api';
import { useSession } from 'next-auth/react';
import AppContext from 'components/AppContext';
import moment from 'moment';

export default function CursoCard({ Curso, options = false }) {
    const { cache, mutate } = useSWRConfig()
    const { data: session, status } = useSession()
    const favoriteList = cache.get("/api/favorites")
    const shopingcartList = cache.get("/api/shopingcart")
    const router = useRouter()
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;


    const value = useContext(AppContext);
    let { setlocalStorageData } = value
    let { localStorageData } = value.state;

    const handleCourseRoute = (e) => {
        e.preventDefault()
        router.push(`/curso/${Curso.ruta}`)
    }

    const handleActionFavorites = async (idCurso, add) => {
        if (session && status != 'loading') {
            await axios.post(`/api/favorites/${idCurso}?action=${add ? 'add' : 'remove'}`);
            mutate("/api/favorites")
        } else {
            let list = localStorageData?.fav ?? [],
                tmpnewlist = [];
            if (list?.some(lc => lc.idCurso == idCurso)) {
                tmpnewlist = list.filter(lc => lc.idCurso != idCurso)
            } else {
                tmpnewlist = list.concat({ idCurso: idCurso, active: true })
            }
            setlocalStorageData({
                ...localStorageData,
                fav: tmpnewlist
            })
            localStorage.setItem("arrayDataFav", JSON.stringify(tmpnewlist))
        }
    }

    const handleActionShopingCart = async (idCurso, add) => {
        if (session && status != 'loading') {
            await axios.post(`/api/shopingcart/${idCurso}?action=${add ? 'add' : 'remove'}`);
            mutate("/api/shopingcart")
        } else {
            let list = localStorageData?.cart ?? [],
                tmpnewlist = [];
            if (list?.some(lc => lc.idCurso == idCurso)) {
                tmpnewlist = list.filter(lc => lc.idCurso != idCurso)
            } else {
                tmpnewlist = list.concat({ idCurso: idCurso, active: true })
            }
            setlocalStorageData({
                ...localStorageData,
                cart: tmpnewlist
            })
            localStorage.setItem("arrayDataCart", JSON.stringify(tmpnewlist))
        }
    }

    return (
        <div className="box-border rounded-2xl bg-cardblue shadow-xl h-full text-white cursor-pointer" onClick={handleCourseRoute}>
            <div className='h-full flex flex-col relative'>
                <div className='px-0 relative group'>
                    <Image
                        className='rounded-t-xl'
                        src={Curso.image}
                        alt={Curso.title}
                        width={380}
                        height={210}
                        objectFit={"cover"}
                        layout="responsive"
                    />
                    {
                        options &&
                        <>
                        {
                            moment({hours: 0 }).diff(Curso.registration_date, 'days') < 30 &&
                            <span className='absolute top-0 right-0 bg-blue-600 px-3 py-1 m-1 rounded-md font-bold'>Nuevo</span>
                        }
                        </>
                    }
                    {
                        options && Curso.price ?
                            <div className='transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0 rounded-t-xl flex justify-center items-center gap-4'>
                                <div className='bg-black absolute inset-0 z-1 rounded-t-xl border-1 border-black opacity-80'></div>
                                <button className='relative w-14 h-14 hover:-translate-y-1 z-20 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-full flex justify-center items-center' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleActionShopingCart(Curso.id, shopingcartList?.every(a => a.idCurso != Curso.id)) }}>
                                    {
                                        (session && status != 'loading') ?
                                            (
                                                shopingcartList?.some(a => a.idCurso == Curso.id) ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                            )
                                            :
                                            (
                                                localStorageData?.cart?.some(a => a.idCurso == Curso.id) ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                            )
                                    }
                                </button>
                                <button className='relative w-14 h-14 hover:-translate-y-1 z-20 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-full flex justify-center items-center' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleActionFavorites(Curso.id, favoriteList?.every(a => a.idCurso != Curso.id)) }}>
                                    {
                                        (session && status != 'loading') ?
                                            (
                                                favoriteList?.some(a => a.idCurso == Curso.id) ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                            )
                                            :
                                            (
                                                localStorageData?.fav?.some(a => a.idCurso == Curso.id) ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                            )
                                    }
                                </button>
                            </div>
                            :
                            ''
                    }
                </div>
                <div className='px-3 pt-5 pb-3  flex flex-col justify-between gap-2 h-[9.5rem]'>
                    <div className=''>
                        <p className='text-md line-clamp-2 leading-tight max-h-10'>{Curso.title}</p>
                        <p className='text-sm line-clamp-1 text-slate-400 leading-tight mt-1'>{Curso.name}</p>
                    </div>
                    <div className='flex items-end justify-start'>
                        <div className='flex flex-col mt-1'>
                            <span className='text-md line-through text-gray-400'>{Curso.priceWODiscount ? `S/.${Curso.priceWODiscount?.toFixed(2)}` : ''}</span>
                            <span className='text-lg'>{Curso.price ? `S/.${Curso.price?.toFixed(2)}` : 'Gratis'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
