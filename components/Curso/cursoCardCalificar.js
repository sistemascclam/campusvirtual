import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function CursoCardCalificar({ curso, avance, handleCalificar }) {
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    return (
        <div className="box-border rounded-2xl bg-cardblue h-full text-white shadow-xl">
            <Link href={"/curso/" + curso.ruta}>
                <a className='w-full flex flex-col md:flex-row h-full'>
                    <div className='h-auto w-full md:w-3/12 relative'>
                        <Image
                            className='rounded-l-xl h-full w-full'
                            src={curso.image}
                            alt={curso.title}
                            objectFit={"cover"}
                            layout="fill"
                        />
                    </div>
                    <div className='w-full md:w-9/12 px-5 py-2 md:py-6 relative'>
                        <div className='my-2'>
                            <p className='text-lg line-clamp-2 leading-tight max-h-10'>{curso.title}</p>
                            <p className='text-base text-slate-400 leading-tight mt-1'>{curso.name}</p>
                        </div>
                        <div className='flex items-center'>
                            <AvanceBar avance={avance} handleCalificar={handleCalificar} curso={curso} />
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

const AvanceBar = ({ avance, handleCalificar,curso }) =>
    <div className="w-full">
        {
            avance == 100 ?
                <button onClick={(e)=>{e.preventDefault();e.stopPropagation();handleCalificar(curso)}} className="text-blue-300 rounded-full shadow-xl hover:underline flex gap-1 items-center">
                    Calificar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                : <>
                    {
                        avance > 0 ? <p className="text-blue-600 text-sm font-bold text-right">{avance}%</p> : ""
                    }
                    <div className="mt-1 w-full h-3 rounded-full bg-gray-500">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${avance}%` }}></div>
                    </div>
                    {
                        avance == 0 ? <p className="mt-1 text-sm text-gray-300 font-semibold">Empezar Curso</p> : ""
                    }
                </>
        }
    </div>