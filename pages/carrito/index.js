import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "../../components/global/layout";
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import CursoCardLarge from 'components/Curso/cursoCardLarge';
import axios from '@util/Api';
import { toMoney } from '@util/helper';
import { useRouter } from 'next/router';

export default function Favoritos() {
    const router = useRouter()
    const [arrayC, setarrayC] = useState([])
    const [_total, _settotal] = useState(0)
    const session = useSession()
    const [_action, _setAction] = useState('')
    const [descuento, setdescuento] = useState(null)
    const [errordescuento, seterrordescuento] = useState(false)

    const { data: auxarrayC } = useSWR('/api/public/getCarrito', (...args) => fetch(...args).then(res => res.json()))

    function deleteElement(_auxidFavorite) {
        if (_action == 'BD') {
            fetch('/api/public/actionShoping/remov--' + _auxidFavorite)
                .then(response => response.json())
                .then(data => setarrayC(data));
            let auxTotal = 0
            for (let index = 0; index < arrayC.length; index++) {
                if (arrayC[index].id != _auxidFavorite) {
                    auxTotal = auxTotal + arrayC[index].curso.price
                }
            }
            _settotal(auxTotal)
        } else if (_action == 'localStorage') {
            var sumaTotal = 0
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                arrayDataCart = JSON.parse(arrayDataCart)
                for (let i = 0; i < arrayDataCart.length; i++) {
                    if (arrayDataCart[i]['idCurso'] == _auxidFavorite) {
                        arrayDataCart[i]['active'] = false
                        break
                    }
                }
                localStorage.setItem("arrayDataCart", JSON.stringify(arrayDataCart))

                fetch('/api/public/buscarCarritoLocal/' + JSON.stringify(arrayDataCart))
                    .then(response => response.json())
                    .then(_data => (setarrayC(_data[0].resultado), _settotal(_data[0].suma)));
                _setAction('localStorage')
            }
        }
    }

    useEffect(() => {
        if (session?.status != 'loading') {
            if (session.data != null) { //BD 
                if (auxarrayC) {
                    setarrayC(auxarrayC)
                    let auxTotal = 0
                    for (let index = 0; index < auxarrayC?.length; index++) {
                        auxTotal = auxTotal + auxarrayC[index].curso.price
                    }
                    _settotal(auxTotal)
                    _setAction('BD')
                }
            } else { //localStorage
                let data = []
                let arrayDataCart = localStorage.getItem("arrayDataCart")
                if (arrayDataCart != null && arrayDataCart != '') {
                    data = arrayDataCart
                    fetch('/api/public/buscarCarritoLocal/' + data)
                        .then(response => response.json())
                        .then(_data => (setarrayC(_data[0].resultado), _settotal(_data[0].suma)));
                }
                _setAction('localStorage')
            }
        }
    }, [session, auxarrayC])

    const handleSearchCod = async (e) => {
        e.preventDefault();
        if (descuento) {
            document.getElementById("codigo").value = null
            setdescuento(null)
        } else {
            let codigo = document.getElementById("codigo").value
            if (codigo) {
                const axiosReq = await axios.post(`/api/searchdiscount`, { code: codigo });
                const { data } = axiosReq
                setdescuento(data)
                seterrordescuento(data == "")
            }
        }
    }

    const handleSubmitPay = (e) => {
        e.preventDefault();
        let codigo = document.getElementById("codigo").value
        router.push(`/checkout/${codigo ? `?codigodescuento=${codigo}` : ''}`)

    }

    var trash = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>,
        search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>,
        trash = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='text-2xl font-serif font-bold font-mono text-slate-50'>
                <div className='w-max pb-2 pl-1 pr-2 border-b-2 border-transparent border-blue-600'>
                    Mi carrito de compras
                </div>
            </div>
            {arrayC?.length > 0 ?
                '' :
                <>
                    <div className="   text-center w-full  py-14 border-inherit ">
                        <p className='text-slate-100 text-2xl '>No tienes nada en tu carrito de compras</p>
                    </div>
                </>
            }
            <div className="flex flex-col md:flex-row min-h-screen bg-cover bg-top-left py-5 ">
                <div className='text-white text-center block md:hidden my-3'>Cursos Seleccionados</div>
                <div className={`text-white lg:w-2/3`}>
                    {arrayC?.length > 0 ?
                        arrayC?.map((Curso, sec_k) => (
                            <div key={`curso_card_${Curso.id}_${sec_k}`} className="mb-6 relative">
                                <CursoCardLarge Curso={_action == 'BD' ? Curso.curso : Curso.curso[0]} />
                                <div className='absolute inset-x-0 ml-auto rounded-full z-10 right-2 top-2 cursor-pointer inset-0 w-8 h-8 flex justify-center items-center bg-slate-800 text-white hover:bg-slate-800' onClick={() => deleteElement(Curso.id)}>
                                    {trash}
                                </div>
                            </div>
                        ))
                        : ''
                    }
                </div>

                {arrayC?.length > 0 ?
                    <div className="text-white w-full md:w-1/3 order-first md:order-last">
                        <div className='pb-6 px-0 md:px-14'>
                            <div className='border-solid border-2 border-slate-900 md:border-slate-800 rounded-2xl shadow-lg bg-slate-900 md:bg-slate-800'>
                                <div className='text-center text-lg py-2'>Total</div>
                                {
                                    descuento ?
                                        <>

                                            <div className='text-center text-sm font-bold'> <span className='line-through'> S/. {toMoney(_total)} </span></div>
                                            <div className='text-center text-lg font-bold text-green-600'>{" -"} S/. {toMoney(descuento?.monto)}</div>
                                        </> : ""
                                }
                                <div className='text-center text-4xl font-bold py-2'>S/. {toMoney(_total - (descuento?.monto ?? 0))}</div>


                                <form className='py-2 px-8' onSubmit={handleSearchCod}>
                                    <label className="relative block">
                                        <button type="submit" className="absolute right-0 inset-y-0 h-full bg-blue-600 rounded-full w-9 flex items-center justify-center" >
                                            {
                                                descuento ?
                                                    trash :
                                                    search}
                                        </button>
                                        <input required type="text" id="codigo" name="codigo" placeholder="Código de descuento" autoComplete='off' className="text-black text-center shadow bg-slate-100  appearance-none border rounded-full w-full text-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                                    </label>
                                    {
                                        errordescuento ?
                                        <p className='text-center mt-1 italic'>No se encontró el descuento</p> : ""
                                    }
                                </form>
                                <div className='mb-8 mt-6'>
                                    <button onClick={handleSubmitPay} type='button' className='w-32 mx-auto block py-1 px-0 bg-blue-600 text-center border-solid border-2 border-blue-600 rounded-full'>
                                        Pagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
                }
            </div>

        </Layout>
    )
}   
