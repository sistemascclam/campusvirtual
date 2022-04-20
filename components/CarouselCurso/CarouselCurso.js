import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link'
import Image from 'next/image'

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
        items: 1
    }
};

export default function CarouselCurso({ arrayC }) {
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;

    return (
        <>
            {arrayC?.length > 0 ?
                <Carousel responsive={responsive} >
                    {arrayC?.map((Curso, sec_k) => (
                        <div className='rounded-lg' key={`curso_card_${Curso.id}_${sec_k}`}>
                            <div className="box-border rounded-l-xl   ">
                                <div className='mx-auto py-6 lg:pr-6'>
                                    <div className=' bg-slate-800 rounded-2xl shadow-xl'>
                                        <Link href={"/curso/" + Curso.ruta}>
                                        <a>
                                            <div>
                                                <div className='px-0 '>
                                                    <Image
                                                        className='rounded-t-xl'
                                                        src={Curso.image}
                                                        alt={Curso.title}
                                                        width={380}
                                                        height={210}
                                                        objectFit={"cover"}
                                                    />
                                                </div>
                                                <div className='py-2 px-3'>
                                                    <div>
                                                        <span className='text-xs line-clamp-2 leading-5 max-h-10'>{Curso.title}</span>
                                                        <span className='text-xs text-slate-400 leading-5 '>{Curso.name}</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className='text-xs flex text-amber-400'>
                                                            {[...Array(5).keys()].map((a, i) => i < Curso.valuation ? <span key={`star_full_key_${Curso.id}_${i}`}>{star_full}</span> : <span key={`star_key_${Curso.id}_${i}`}>{star}</span>)}
                                                        </span>
                                                        <span className='text-xs text-slate-400'>({Curso.valuation})</span>
                                                    </div>
                                                    <div className='py-3'>
                                                        S/<span className='text-base'>{Curso.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                : ''
            }
        </>
    )
}

