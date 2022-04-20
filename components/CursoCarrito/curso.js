import React, { useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import "react-multi-carousel/lib/styles.css";

export default function curso({ arrayData }) {
    const [arrayC, setarrayC]   = useState([])

    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var trash = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>;

    function deleteElement(_auxidFavorite) {
        fetch('/api/public/actionShoping/remov--'+_auxidFavorite)
        .then(response => response.json())
        .then(data => setarrayC(data));
    }

    useEffect(() => {
        setarrayC(arrayData)
    },[arrayData])
    
  return (
    <>
    {arrayC?.length > 0 ?
            <>
            {arrayC?.map((Curso, sec_k) => (
                <div className='w-full flex py-3 px-14' key={`curso_card_${Curso.id}_${sec_k}`}>
                    <div className="text-white w-1/4 w-full h-32 ">
                        <img
                            className='rounded-l-lg h-full w-full'
                            src={arrayC[sec_k].curso.image}
                            alt={arrayC[sec_k].curso.title}
                        />
                    </div>
                    <div className="flex text-white w-3/4 w-full rounded-r-xl bg-slate-800">
                        <div className='w-5/6 border-solid '>
                            <div className='py-4 px-5'>
                                <div>
                                    <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-bold'>{arrayC[sec_k].curso.title}</span>
                                    <span className='text-sm text-slate-400 leading-5 py-3'>{arrayC[sec_k].curso.name}</span>
                                </div>
                                <div className='py-3 text-slate-50 font-bold'>
                                    S/<span className='text-base  '>{arrayC[sec_k].curso.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/6 border-solid '>
                            <div className='text-right'>
                                <Link href="#"><a>
                                <div className='absolute z-10 text-white py-3 pl-8' onClick={() => deleteElement(Curso.id)}>
                                    {trash}
                                </div>
                                </a></Link>
                            </div>
                        </div>
                    </div>
                </div>


            ))}
            </>
        : ''
    }
</>
  )
}
