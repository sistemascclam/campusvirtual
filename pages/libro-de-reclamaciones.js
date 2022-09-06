import React, { useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout"
import moment from "moment"
import 'moment/locale/es'
import axios from '@util/Api'
import { promiseToast } from '@util/helper'
import { useRouter } from 'next/router'
moment.locale('es')

export default function LibroReclamaciones() {

    const [formData, setformData] = useState({})
    const router = useRouter()

    const reloadAfterSave=()=>{
        router.push(`/`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        promiseToast(axios.post(`/api/claimbook/save`, { formData }), reloadAfterSave)
    }

    const changeInput = (e) => {
        setformData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className='min-h-screen'>
                <div className='w-full'>
                    <div className='text-2xl font-serif font-bold font-mono text-slate-50 '>
                        <h1 className='w-max pb-2 border-b-2 border-transparent pl-1 pr-2 border-blue-600'>
                            Libro de reclamaciones
                        </h1>
                    </div>
                </div>
                <div className="mt-10 pb-20 ">
                    <form onSubmit={handleSubmit} className='gap-4'>
                        <div className='flex flex-wrap gap-4'>
                            <p className='text-slate-300 mb-2 font-semibold text-lg flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                </svg>
                                Información personal
                            </p>
                            <div className='w-full flex gap-4 '>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Tipo de documento
                                    </label>
                                    <select onChange={changeInput} required id="tipoDoc" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="">--Seleccione--</option>
                                        <option value="dni">DNI</option>
                                        <option value="ce">Carnet de extranjería</option>
                                        <option value="p">Pasaporte</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Documento
                                    </label>
                                    <input onChange={changeInput} required type="text" id="documento" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                            <div className='w-full flex gap-4 '>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Nombres
                                    </label>
                                    <input onChange={changeInput} required type="text" id="nombres" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Apellidos
                                    </label>
                                    <input onChange={changeInput} required type="text" id="apellidos" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                            <div className='w-full flex gap-4 '>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Correo electrónico
                                    </label>
                                    <input onChange={changeInput} required type="email" id="correo" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Teléfono
                                    </label>
                                    <input onChange={changeInput} type="phone" id="telefono" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-4 mt-10'>
                            <p className='text-slate-300 mb-2 font-semibold text-lg flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                                </svg>
                                Información del servicio
                            </p>
                            <div className='w-full'>
                                <label className="block text-slate-300 text-base mb-2" >
                                    Descripción del servicio
                                </label>
                                <input onChange={changeInput} required type="text" id="servicio" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className='w-full'>
                                <label className="block text-slate-300 text-base mb-2" >
                                    Descripción del reclamo/sugerencia
                                </label>
                                <textarea onChange={changeInput} required type="text" id="reclamo" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline">
                                </textarea>
                            </div>
                            <div className='w-full'>
                                <label className="block text-slate-300 text-base mb-2" >
                                    Solicitud
                                </label>
                                <textarea onChange={changeInput} required type="text" id="solicitud" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline">
                                </textarea>
                            </div>
                        </div>
                        <button className="mt-6 font-extrabold text-md bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg  focus:outline-none focus:shadow-outline">Enviar</button>
                    </form>
                </div>
            </section>
        </Layout>
    )
}