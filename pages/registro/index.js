import Head from 'next/head'
import Link from 'next/link'

import { signIn, getCsrfToken } from 'next-auth/react';
import Layout, { siteTitle } from "@global/layout"
import React, { useState } from 'react'
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [tipo, setTipo] = useState('password');

    var eye = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>;

    var eyes_off = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signIn('credentials', {
            redirect: false,
            email: event.target.email.value,
            password: event.target.password.value,
            callbackUrl: `${window.location.origin}`,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            setError(null);
        }
        if (res.url) router.push(res.url);
    }

    return (
        <Layout>
            <Head>
                <title>Inicio de Sesión | {siteTitle}</title>
            </Head>
            <div className="flex min-h-screen bg-darkblue">
                <div className="text-white lg:w-1/2 p-4 w-full">
                    <div className='py-12 px-4 sm:px-6 lg:px-8'>
                        <div className='mx-auto py-6 '>
                            <img
                                className="h-12 mx-auto "
                                src="images/cclamlogotipo.png"
                                alt="Logo"
                            />
                        </div>

                        <div className='text-center text-slate-100 '><b>Únete y comienza a potenciar tu carrera</b></div>
                        <div className="w-full max-w-xs mx-auto">
                            <div className="text-red-400 text-md text-center rounded p-2">
                                {error}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-slate-300 text-sm mb-2" >
                                        Correo electrónico ingresado
                                    </label>
                                    <input type="email" id="email" name="email" placeholder="ejm@gmail.com" autoComplete='off' required className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-6">
                                    <div className='py-1'>
                                        <span className="text-slate-300 text-sm ">Crea tu contraseña</span>
                                    </div>
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 right-3 flex items-center pl-2" onClick={() => setTipo(tipo == 'password' ? 'text' : 'password')}>
                                            {tipo == 'password' ? eye : eyes_off}
                                        </span>
                                        <input type={tipo} placeholder="******************" name="password" id="password" required className="bg-gray-900 rounded text-sm border placeholder:italic placeholder:text-slate-400 block w-full  shadow-sm focus:outline-none  focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                                    </label>
                                </div>
                            <div className="flex flex-col items-center justify-between">
                                <button type="submit" className="bg-blue-700 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
                                    REGISTRARSE
                                </button>
                            </div>
                            </form>
                            <div className='text-center text-xs py-5'>
                                <span className='text-slate-400'>Al crear una cuenta estás aceptando los</span> <br /> <span className='text-gray-200 underline'>Términos de Servicio</span> <span className='text-slate-400'> y</span> <span className='text-gray-200 underline'> Privacidad</span>
                            </div>
                            <div className='text-center py-6 w-5/6 mx-auto' >
                                <div className='py-3 text-xs   rounded-lg border-solid border-2 border-slate-600'>
                                    <span>¿Ya tienes cuenta?</span>
                                    <Link href="/inicio-sesion">
                                        <a> <span className='text-sky-500 underline'>Inicia sesión aquí</span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="text-white w-1/2 p-4 hidden lg:block">
                    {/*cuerpo de la segunda parte*/}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
