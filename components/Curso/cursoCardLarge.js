import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function CursoCardLarge({ Curso }) {
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    return (
        <div className="box-border rounded-2xl bg-slate-800 shadow-md h-full text-white">
            <Link href={"/curso/" + Curso.ruta}>
                <a className='w-full flex'>
                    <div className=' w-3/12 relative'>
                        <Image
                            className='rounded-l-lg h-full w-full'
                            src={Curso.image}
                            alt={Curso.title}
                            objectFit={"cover"}
                            layout="fill"
                        />
                    </div>
                    <div className='w-9/12 pl-5 py-4'>
                        <div className='my-2'>
                            <p className='text-lg line-clamp-2 leading-tight max-h-10'>{Curso.title}</p>
                            <p className='text-base text-slate-400 leading-tight mt-1'>{Curso.name}</p>
                        </div>
                        <div className='flex'>
                            <span className='text-xs flex text-amber-400'>
                                {[...Array(5).keys()].map((a, i) => i < Curso.valuation ? <span key={`star_full_key_${Curso.id}_${i}`}>{star_full}</span> : <span key={`star_key_${Curso.id}_${i}`}>{star}</span>)}
                            </span>
                            <span className='text-xs text-slate-400'>({Curso.valuation})</span>
                        </div>
                        <div className='py-3'>
                            S/<span className='text-base'>{Curso.price?.toFixed(2)}</span>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}
