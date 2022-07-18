import Head from 'next/head'
import Link from 'next/link'

import { signIn, getCsrfToken, getSession } from 'next-auth/react'
import Layout, { siteTitle } from "@global/layout"
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getAuthError } from 'util/helper'
import Image from 'next/image'

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
                            <div className="text-red-400 text-md text-center rounded p-2 mt-3">
                                {(errorAuth ? getAuthError(router.query.error) : '') || (error ? getAuthError(router.query.error) : '')}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <button type="button" onClick={handleRegisterWGoogle} className="flex text-center text-gray-900 font-semibold bg-gray-200 hover:bg-gray-300 px-4 py-2 text-base rounded w-full">
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
                                    <input type="email" id="email" name="email" placeholder="email@domain.com" autoComplete='off' required className="shadow bg-gray-900 hover:bg-darkblue appearance-none border rounded w-full text-base py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col items-center justify-between mt-6">
                                    <button type="submit" className="bg-blue-700 hover:bg-blue-600 font-bold text-white text-base py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
                                        Crear mi cuenta
                                    </button>
                                </div>
                            </form>
                            <div className='text-center text-xs py-5'>
                                <span className='text-slate-400'>Al crear una cuenta estás aceptando los</span> <br /> <span className='text-gray-200 underline'>Términos de Servicio</span> <span className='text-slate-400'> y</span> <span className='text-gray-200 underline'> Privacidad</span>
                            </div>
                            <div className='text-center py-6 w-full mx-auto' >
                                <div className='py-3 text-base rounded-lg border-solid border-2 border-slate-600'>
                                    <span>¿Ya tienes cuenta?</span>
                                    <Link href="/inicio-sesion">
                                        <a> <span className='text-sky-500 font-extrabold ml-1'>Inicia sesión aquí</span></a>
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
