import React, { useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import "react-multi-carousel/lib/styles.css";
  
export default function curso({ arrayData }) {
    const [arrayC, setarrayC]   = useState(null)
    const [_action, _setAction] = useState('')

    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var trash = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>;

    function deleteElement(_auxidFavorite){
        if(_action == 'BD'){
            fetch('/api/public/actionFavorites/remov--'+_auxidFavorite)
            .then(response => response.json())
            .then(data => setarrayC(data));
        }else if(_action == 'localStorage'){
            var arrayDataFav = localStorage.getItem("arrayDataFav")
            if (arrayDataFav != null && arrayDataFav != '') {
                arrayDataFav = JSON.parse(arrayDataFav)
                for (let i = 0; i < arrayDataFav.length; i++){
                    if(arrayDataFav[i]['idCurso'] == _auxidFavorite){
                        arrayDataFav[i]['active'] = false
                        break;
                    }
                }
                localStorage.setItem("arrayDataFav",JSON.stringify(arrayDataFav))
                var auxarrayDataFav = localStorage.getItem("arrayDataFav")
    
                fetch('/api/public/listFavoritesLocalStorage/'+auxarrayDataFav+'--0')
                .then(response => response.json())
                .then(data => setarrayC(data));
            }
        }
    }

    useEffect(() => {
        if(arrayData[0].action == 'BD'){ //BD
            setarrayC(arrayData[0].arrayC)
            _setAction('BD')
        }else if(arrayData[0].action == 'localStorage'){ //localStorage
            //setarrayC(arrayData[0].arrayC)
            fetch('/api/public/listFavoritesLocalStorage/'+arrayData[0].arrayC+'--0')
            .then(response => response.json())
            .then(data => setarrayC(data));
            _setAction('localStorage')
        }
        
    },[arrayData])

  return (
    <>
    {arrayC != null ?
        _action == 'BD' ?
        <div className="w-full flex justify-center ">
            <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 " >
            {arrayC.map((Curso, sec_k) => (
                <div className={`py-0 lg:py-6`} key={`curso_card_${Curso.id}_${sec_k}`}>
                    <div className='rounded-lg' >
                        <div className="box-border rounded-l-xl">
                            <div className='mx-auto py-6 lg:pr-6'>
                                <div className=' bg-slate-800 rounded-2xl shadow-xl'>
                                    <div>
                                        <div className='px-0 '>
                                            <div className='text-right flex justify-end px-8' title="Eliminar">
                                                <Link href="#"><a>
                                                    <div className='min-w-0 rounded-full bg-slate-800 py-1 px-1 absolute z-10 text-white ' onClick={() => deleteElement(Curso.id)}>
                                                        {trash}
                                                    </div>
                                                </a></Link>
                                            </div>
                                            <Image
                                                className='rounded-t-xl'
                                                src={arrayC[sec_k].curso.image}
                                                alt={arrayC[sec_k].curso.title}
                                                width={380}
                                                height={210}
                                                objectFit={"cover"}
                                            />
                                        </div>
                                        <div className='py-2 px-3'>
                                            <div>
                                                <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-medium'>{arrayC[sec_k].curso.title}</span>
                                                <span className='text-sm text-slate-400 leading-5 '>{arrayC[sec_k].curso.name}</span>
                                            </div>
                                            <div className='flex'>
                                                <span className='text-sm flex text-amber-400'>
                                                    {[...Array(5).keys()].map((a, i) => i < arrayC[sec_k].curso.valuation ? <span key={`star_full_key_${arrayC[sec_k].curso.id}_${i}`}>{star_full}</span> : <span key={`star_key_${arrayC[sec_k].curso.id}_${i}`}>{star}</span>)}
                                                </span>
                                                <span className='text-sm text-slate-400'>({arrayC[sec_k].curso.valuation})</span>
                                            </div>
                                            <div className='py-3 text-slate-50'>
                                                S/<span className='text-base  '>{arrayC[sec_k].curso.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div> 
        :
        <div className="w-full flex justify-center ">
            <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 " >
                {arrayC?.map((Curso, sec_k) => (
                    <div className={`py-0 lg:py-6`} key={`curso_card_${Curso.id}_${sec_k}`}>
                        <div className='rounded-lg' >
                            <div className="box-border rounded-l-xl">
                                <div className='mx-auto py-6 lg:pr-6'>
                                    <div className=' bg-slate-800 rounded-2xl shadow-xl'>
                                        <div>
                                            <div className='px-0 '>
                                                <div className='text-right flex justify-end px-8'>
                                                    <Link href="#"><a>
                                                    <div className='min-w-0 rounded-full bg-slate-800 py-1 px-1 absolute z-10 text-white ' onClick={() => deleteElement(Curso.id)}>
                                                        {trash}
                                                    </div>
                                                    </a></Link>
                                                </div>
                                                <Image
                                                    className='rounded-t-xl'
                                                    src={arrayC[sec_k].curso[0].image}
                                                    alt={arrayC[sec_k].curso[0].title}
                                                    width={380}
                                                    height={210}
                                                    objectFit={"cover"}
                                                />
                                            </div>
                                            <div className='py-2 px-3'>
                                                <div>
                                                    <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-medium'>{arrayC[sec_k].curso[0].title}</span>
                                                    <span className='text-sm text-slate-400 leading-5 '>{arrayC[sec_k].curso[0].name}</span>
                                                </div>
                                                <div className='flex'>
                                                    <span className='text-sm flex text-amber-400'>
                                                        {[...Array(5).keys()].map((a, i) => i < arrayC[sec_k].curso[0].valuation ? <span key={`star_full_key_${arrayC[sec_k].curso[0].id}_${i}`}>{star_full}</span> : <span key={`star_key_${arrayC[sec_k].curso[0].id}_${i}`}>{star}</span>)}
                                                    </span>
                                                    <span className='text-sm text-slate-400'>({arrayC[sec_k].curso[0].valuation})</span>
                                                </div>
                                                <div className='py-3 text-slate-50'>
                                                    S/<span className='text-base  '>{arrayC[sec_k].curso[0].price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    : ''
    }
</>
  )
}
