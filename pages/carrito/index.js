import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "../../components/global/layout";
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

export default function Favoritos() {
    const [arrayC, setarrayC]   = useState([])
    const [_total, _settotal]   = useState(0)
    const session = useSession()
    const [_action, _setAction] = useState('')

    const {data:auxarrayC} = useSWR('/api/public/getCarrito', (...args) => fetch(...args).then(res => res.json()))
    
    function deleteElement(_auxidFavorite) {
        if(_action == 'BD'){
            fetch('/api/public/actionShoping/remov--'+_auxidFavorite)
            .then(response => response.json())
            .then(data => setarrayC(data));
            let auxTotal = 0
            for (let index = 0; index < arrayC.length; index++) {
                if(arrayC[index].id != _auxidFavorite){ 
                    auxTotal = auxTotal + arrayC[index].curso.price
                }
            }
            _settotal(auxTotal)
        }else if(_action == 'localStorage'){
            var sumaTotal = 0
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                arrayDataCart = JSON.parse(arrayDataCart)
                for (let i = 0; i < arrayDataCart.length; i++){
                    if(arrayDataCart[i]['idCurso'] == _auxidFavorite){
                        arrayDataCart[i]['active'] = false 
                        //sumaTotal = _total - 
                        break
                    }
                }
                localStorage.setItem("arrayDataCart",JSON.stringify(arrayDataCart))

                fetch('/api/public/buscarCarritoLocal/'+JSON.stringify(arrayDataCart))
                .then(response => response.json())
                .then(_data => (setarrayC(_data[0].resultado), _settotal(_data[0].suma)));
                _setAction('localStorage')
            }
        }
    }

    useEffect(() => {
        if (session.data != null){ //BD 
            setarrayC(auxarrayC)
            let auxTotal = 0
            for (let index = 0; index < auxarrayC?.length; index++) {
                auxTotal = auxTotal + auxarrayC[index].curso.price
            }
            _settotal(auxTotal)
            _setAction('BD')
        }else{ //localStorage
            let data = []
            let arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != ''){
                data = arrayDataCart
            } 
            fetch('/api/public/buscarCarritoLocal/'+data)
            .then(response => response.json())
            .then(_data => (setarrayC(_data[0].resultado), _settotal(_data[0].suma)));
            _setAction('localStorage')
        }
    },[session, auxarrayC])
 
    var trash = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>;
    var search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
    </svg>;
    return ( 
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='text-2xl font-serif font-bold font-mono text-slate-50  '>
                <div className='lg:w-1/3 md:w-1/2 sm:w-1/2 sm:px-5 px-5 border-b-2 border-transparent border-sky-700'>
                    Mi carrito de compras
                </div>
            </div>

            <div className="lg:flex md:flex min-h-screen bg-cover bg-top-left py-5 ">
                <div className="text-white lg:w-2/3 ">
                {arrayC?.length > 0 ?
                    _action == 'BD'?
                        arrayC?.map((Curso, sec_k) => (
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
                                    <div className='text-right flex justify-end px-8' title="Eliminar">
                                        <Link href="#"><a>
                                        <div className='min-w-0 rounded-full bg-slate-800 py-2 px-1  text-white ' onClick={() => deleteElement(Curso.id)}>
                                            {trash}
                                        </div>
                                        </a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )) : 
                        arrayC?.map((Curso, sec_k) => (
                            <div className='w-full flex py-3 px-14' key={`curso_card_${Curso.id}_${sec_k}`}>
                                <div className="text-white w-1/4 w-full h-32 ">
                                    <img
                                        className='rounded-l-lg h-full w-full'
                                        src={arrayC[sec_k].curso[0].image}
                                        alt={arrayC[sec_k].curso[0].title}
                                    />
                                </div>
                                <div className="flex text-white w-3/4 w-full rounded-r-xl bg-slate-800">
                                    <div className='w-5/6 border-solid '>
                                        <div className='py-4 px-5'>
                                            <div>
                                                <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-bold'>{arrayC[sec_k].curso[0].title}</span>
                                                <span className='text-sm text-slate-400 leading-5 py-3'>{arrayC[sec_k].curso[0].name}</span>
                                            </div>
                                            <div className='py-3 text-slate-50 font-bold'>
                                                S/<span className='text-base  '>{arrayC[sec_k].curso[0].price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-1/6 border-solid '>
                                        <div className='text-right flex justify-end px-8' title="Eliminar">
                                            <Link href="#"><a>
                                            <div className='min-w-0 rounded-full bg-slate-800 py-2 px-1  text-white ' onClick={() => deleteElement(Curso.id)}>
                                                {trash}
                                            </div>
                                            </a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    : ''
                }
                </div>
                <div className="text-white lg:w-1/3 ">
                   <div className=' py-3 px-14'>
                        <div className='border-solid border-2 border-slate-800 rounded-3xl bg-slate-800'>
                            <div className='text-center text-lg py-2'>Total</div>
                            <div className='text-center text-4xl font-bold py-2'>S/. {_total.toFixed(2)}</div>
                            <div className='py-2 px-8'> 
                                <label className="relative block">
                                    <span className="absolute inset-y-0 right-3 flex items-center pl-2" >
                                        <div className='py-0 lg:py-6 '>
                                            <Link href="#"><a>
                                            <div className="  rounded-full bg-blue-400">
                                                {search}
                                            </div>
                                            </a></Link>
                                        </div>
                                    </span>
                                    <input type="text" id="codigo" name="codigo" placeholder="Código de descuento" autoComplete='off' required className="text-black shadow bg-slate-100  appearance-none border rounded-full w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </label> 
                            </div>
                            <div className='py-8'>
                                <Link href="#"><a>
                                <div className='py-2 w-32 mx-auto block py-1 px-0 bg-blue-600 text-center rounded-lg  border-solid border-2 border-blue-600 rounded-full'>
                                    Pagar
                                </div>
                                </a></Link>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </Layout>  
    )
}   
