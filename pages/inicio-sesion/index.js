import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from "@global/layout"
import React, { useState } from 'react'
import { signIn, getCsrfToken, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getAuthError } from 'util/helper'
import Image from 'next/image'

export default function Login({ csrfToken }) {
    const router = useRouter();
    const { error } = router.query
    const [tipo, setTipo] = useState('password');
    const [errorAuth, setErrorAuth] = useState(null);

    var eye = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>;

    var eyes_off = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>;


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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const res = await signIn('credentials', {
    //         redirect: false,
    //         email: event.target.email.value,
    //         password: event.target.password.value,
    //         callbackUrl: `${window.location.origin}`,
    //     });

    //     if (res?.error) {
    //         setErrorAuth(res.error);
    //     } else {
    //         setErrorAuth(null);
    //     }
    //     if (res?.url) router.push(res.url);
    // }

    const handleLoginWGoogle = async (event) => {
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
                <title>Inicio de Sesión | {siteTitle}</title>
            </Head>
            <div className="flex min-h-screen bg-collage-courses bg-cover bg-top-left justify-center content-center items-center">
                <div className="text-white lg:w-1/2 w-full pt-20">
                    <div className='px-4 sm:px-6 lg:px-8'>
                        <div className="w-full max-w-xs mx-auto py-20">
                            <p className='text-center text-4xl mb-3 text-slate-100 font-extrabold'>¡Bienvenido!</p>
                            <p className='text-center text-slate-100 mb-4'><b>Ingresa a tu Campus CCLAM</b></p>
                            <div className="text-red-400 text-md text-center rounded p-2 mt-3">
                                {(errorAuth ? getAuthError(errorAuth) : '') || (error ? getAuthError(router.query.error) : '')}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <button onClick={handleLoginWGoogle} type="button" className="flex text-center text-gray-900 font-semibold bg-gray-200 hover:bg-gray-300 px-4 py-2 text-base rounded w-full">
                                    <Image
                                        src="/images/theme/google.png"
                                        alt="googlelogo"
                                        width={20}
                                        height={20}
                                    />
                                    <span className='w-full text-center'>
                                        Iniciar con Google
                                    </span>
                                </button>
                                <p className="my-4 text-center">o continúa con</p>
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />
                                <div className="mb-4">
                                    <label className="block text-slate-300 text-base mb-2" >
                                        Correo electrónico
                                    </label>
                                    <input required type="email" id="email" placeholder="email@domain.com" className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <button type="submit" className="font-bold bg-blue-700 hover:bg-blue-600 text-white text-base py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
                                        Enviar correo de acceso
                                    </button>
                                </div>
                                <div className='text-center my-6 py-4 w-full mx-auto' >
                                    <div className='py-3 text-base rounded-lg border-solid border-2 border-slate-600'>
                                        <span>¿No tienes cuenta?</span>
                                        <Link href="/registro">
                                            <a> <span className='text-sky-500 font-extrabold ml-1'>Regístrate aquí</span></a>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="text-white w-1/2 p-4 hidden lg:block ">
                </div>
            </div>
        </Layout>
    );
}

//No acceder a la ruta si el usuario está logeado
export async function getServerSideProps(context) {
    const session = await getSession(context)


    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
