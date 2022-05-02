import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function CursoCard({ Curso, options = false }) {
    const router = useRouter()
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;

    const handleCourseRoute = (e) => {
        e.preventDefault()
        router.push(`/curso/${Curso.ruta}`)
    }

    return (
        <div className="box-border rounded-2xl bg-shadow- bg-slate-800 shadow-md h-full text-white cursor-pointer" onClick={handleCourseRoute}>
            <div className='h-full flex flex-col'>
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
                        options && Curso.price ?
                        <div className='transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0 rounded-t-xl flex justify-center items-center gap-4'>
                            <div className='bg-black absolute inset-0 z-1 rounded-t-xl border-1 border-black opacity-80'></div>
                            <button className='relative w-14 h-14 hover:-translate-y-1 z-20 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-full flex justify-center items-center' onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert("carrito") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>
                            <button className='relative w-14 h-14 hover:-translate-y-1 z-20 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-full flex justify-center items-center' onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert("fav") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                    }
                </div>
                <div className='h-full p-3 flex flex-col justify-between gap-2'>
                    <div className=''>
                        <p className='text-lg line-clamp-2 leading-tight max-h-10'>{Curso.title}</p>
                        <p className='text-base line-clamp-1 text-slate-400 leading-tight mt-1'>{Curso.name}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <span className='text-xs flex text-amber-400 items-center'>
                                {[...Array(5).keys()].map((a, i) => i < Curso.valuation ? <span key={`star_full_key_${Curso.id}_${i}`}>{star_full}</span> : <span key={`star_key_${Curso.id}_${i}`}>{star}</span>)}
                            </span>
                            <span className='text-sm text-slate-400 ml-1'>({Curso.valuation})</span>
                        </div>
                        <div className='flex flex-col text-right'>
                            <span className='text-md line-through text-gray-400'>{Curso.priceWODiscount ? `S/.${Curso.priceWODiscount?.toFixed(2)}` : ''}</span>
                            <span className='text-lg'>{Curso.price ? `S/.${Curso.price?.toFixed(2)}` : 'Gratis'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
