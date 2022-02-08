import Head from 'next/head'
import Layout, { siteTitle } from "../../components/global/layout";
import React from 'react';

export default function Login() {
    return (
        <Layout home>
            <Head>
                <title>Inicio de Sesión | {siteTitle}</title>
            </Head>
            <div className="flex h-screen">
                <div className="bg-darkblue text-white w-1/2 p-4">

                    
                    <div className='min-h-full flex items-left justify-left py-12 px-4 sm:px-6 lg:px-8'>

                        <div className="w-full max-w-xs mx-auto">
                            <div className=' justify-left py-6 '>
                                <img
                                    className=" h-12 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt="Workflow"
                                />
                            </div>

                            <div className='text-left text-slate-200'><b>Bienvenido de nuevo</b></div>
                            <div className="rounded  pt-4 ">
                                <div className="mb-4">
                                    <label className="block text-slate-300 text-sm mb-2" for="username">
                                        Correo electrónico
                                    </label>
                                    <input autoComplete='off' className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ejm@gmail.com"></input>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-slate-300 text-sm mb-2" for="password">
                                        Contraseña
                                    </label>
                                    <input className="shadow appearance-none border bg-gray-900 rounded w-full text-sm  py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
                                    {/*<p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-violet-700 hover:bg-violet-800 text-white text-sm py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="button">
                                        INICIAR SESIÓN
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="bg-blue-800 text-white w-1/2 p-4">div 2</div>
            </div>
        </Layout>
    );
}
