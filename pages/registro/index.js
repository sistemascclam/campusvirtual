import Head from 'next/head'
import Link from 'next/link'

import { signIn, getCsrfToken, getSession } from 'next-auth/react'
import Layout, { siteTitle } from "@global/layout"
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuthError } from 'util/helper'

export default function Login({ csrfToken }) {
    const router = useRouter();
    const { error } = router.query
    const [errorAuth, setErrorAuth] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signIn('email', {
            redirect: false,
            email: event.target.email.value,
            callbackUrl: `${window.location.origin}`,
        });
        if (res?.error) {
            setErrorAuth(res.error);
        } else {
            setErrorAuth(null);
        }
        if (res?.url) router.push(res.url);
    }

    const handleRegisterWGoogle = async (event) => {
        event.preventDefault();
        const res = await signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}`
        });
        if (res?.error) {
            setErrorAuth(res.error);
        } else {
            setErrorAuth(null);
        }
        if (res?.url) {
            router.push(res.url);
        }
    }

    return (
        <Layout widthPadding={false}>
            <Head>
                <title>Registro | {siteTitle}</title>
            </Head>
            <div className="flex min-h-screen bg-collage-courses bg-cover bg-top-left justify-center content-center items-center">
                <div className="text-white lg:w-1/2 p-4 w-full">
                    <div className='px-4 sm:px-6 lg:px-8 py-24'>
                        <p className='text-center text-4xl mb-3 text-slate-100 font-extrabold'>¡Regístrate!</p>
                        <p className='text-center text-slate-100 mb-4'><b>Únete y comienza a potenciar tu carrera</b></p>
                        <div className="w-full max-w-xs mx-auto">
                            <div className="text-red-400 text-md text-center rounded p-2 my-3">
                                { (errorAuth ? getAuthError(router.query.error) : '') || (error ? getAuthError(router.query.error) : '')}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />
                                <div className="mb-4">
                                    <label className="block text-slate-300 text-sm mb-2" >
                                        Correo electrónico
                                    </label>
                                    <input type="email" id="email" name="email" placeholder="ejm@gmail.com" autoComplete='off' required className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col items-center justify-between mt-6">
                                    <button type="submit" className="bg-blue-700 hover:bg-blue-600 font-bold text-white text-sm py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
                                        Crear mi cuenta
                                    </button>
                                    <p className="my-4">o regístrate con</p>
                                    <button type="button" onClick={handleRegisterWGoogle} className="w-full text-center text-white bg-blue-700 hover:bg-blue-700/90 focus:ring-4 focus:ring-blue-700/50 font-bold rounded text-sm px-5 py-2.5 inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                        <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                        Google
                                    </button>
                                </div>
                            </form>
                            <div className='text-center text-xs py-5'>
                                <span className='text-slate-400'>Al crear una cuenta estás aceptando los</span> <br /> <span className='text-gray-200 underline'>Términos de Servicio</span> <span className='text-slate-400'> y</span> <span className='text-gray-200 underline'> Privacidad</span>
                            </div>
                            <div className='text-center py-6 w-5/6 mx-auto' >
                                <div className='py-3 text-sm  rounded-lg border-solid border-2 border-slate-600'>
                                    <span>¿Ya tienes cuenta?</span>
                                    <Link href="/inicio-sesion">
                                        <a> <span className='text-sky-500 font-extrabold'>Inicia sesión aquí</span></a>
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
    const session = await getSession(context)
    
    if(session){
        return {
            redirect: {
                destination:'/',
                permanent:false
            }
        }
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
