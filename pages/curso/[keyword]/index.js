import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import Layout, { siteTitle } from '@global/layout';
import axios from '@util/Api';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export default function Curso() {
    const router = useRouter()
    const { keyword } = router.query
    const [arrayDC, setarrayDC] = useState(null)
    const session = useSession()
    const [auxIdUsuario, setauxIdUsuario] = useState(0)
    const [_enCarrito, _setenCarrito] = useState(false)
    const [_esFavorito, _setesFavorito] = useState(false)
    const [_auxidFavorite, _setauxidFavorite] = useState(0)
    const [_auxactiveFavorite, _setauxactiveFavorite] = useState(false)
    const [_auxidCart, _setauxidCart] = useState(0)
    const [_auxactiveCart, _setauxactiveCart] = useState(false)
    const [btnInscription, _setBtnInscription] = useState('Inscribirse ahora')

    const loadCurso = async () => {
        const axiosReq = await axios.get(`/api/curso/${keyword}`);
        const { data } = axiosReq;
        setarrayDC(data)
    }

    useEffect(() => {
        if (keyword) {
            loadCurso()
        }
    }, [keyword])

    var auxIdCurso = 0
    if (arrayDC != null) {
        auxIdCurso = arrayDC.id
    }
    const _auxIdCurso = auxIdCurso

    const localFavorito = async (event) => {
        var arrayDataFav = localStorage.getItem("arrayDataFav")
        if (arrayDataFav != null && arrayDataFav != '') {
            arrayDataFav = JSON.parse(arrayDataFav)
            for (let i = 0; i < arrayDataFav.length; i++) {
                if (arrayDataFav[i]['idCurso'] == _auxIdCurso && arrayDataFav[i]['active'] == true) {
                    _setesFavorito(true)
                    break;
                }
            }
        }
    }
    const localCart = async (event) => {
        var arrayDataCart = localStorage.getItem("arrayDataCart")
        if (arrayDataCart != null && arrayDataCart != '') {
            arrayDataCart = JSON.parse(arrayDataCart)
            for (let i = 0; i < arrayDataCart.length; i++) {
                if (arrayDataCart[i]['idCurso'] == _auxIdCurso && arrayDataCart[i]['active'] == true) {
                    _setenCarrito(true)
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (arrayDC != null) {
            if ((arrayDC.favorites.length) != 0) {
                _setauxidFavorite(arrayDC.favorites[0].id)
                _setesFavorito(arrayDC.favorites[0].active)
            }
            if ((arrayDC.shopingCarts.length) != 0) {
                _setauxidCart(arrayDC.shopingCarts[0].id)
                _setenCarrito(arrayDC.shopingCarts[0].active)
            }
            if (arrayDC?.progress?.length > 0) {
                _setBtnInscription("Ir al curso")
            }
        }

        if (session.data != null) { //BD
            setauxIdUsuario(session.data.user.id)
        } else { //localStorage
            localFavorito()
            localCart()
        }
    }, [session, arrayDC])

    const addFavorite = async (event) => {
        event.preventDefault();
        if (auxIdUsuario != 0) { //se a iniciado sesión
            //verificar si ya se ha registrado en la BD
            if (_auxidFavorite != '') { //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionFavorites/activ--` + _auxidFavorite, (...args) => fetch(...args).then(res => res.json()))
            } else {
                var resp = fetch(`/api/public/addFavorites/${_auxIdCurso}`, (...args) => fetch(...args).then(res => res.json()))
                const response = fetch(`/api/public/listCurso/${_auxIdCurso}`)
                    .then(res => res.json())
                    .then(data => localStorage.setItem("arrayFavCar", JSON.stringify(data)));
            }
        } else {
            var arrayDataFav = localStorage.getItem("arrayDataFav")
            if (arrayDataFav != null && arrayDataFav != '') {
                arrayDataFav = JSON.parse(arrayDataFav)
                var encontrado = false
                for (let i = 0; i < arrayDataFav.length; i++) {
                    if (arrayDataFav[i]['idCurso'] == _auxIdCurso) {
                        arrayDataFav[i]['active'] = true
                        encontrado = true
                        break;
                    }
                }
                if (!encontrado) {
                    arrayDataFav.push({ idCurso: _auxIdCurso, active: true })
                }
                localStorage.setItem("arrayDataFav", JSON.stringify(arrayDataFav))
            } else {
                var auxArray = []
                auxArray.push({ idCurso: _auxIdCurso, active: true })
                localStorage.setItem("arrayDataFav", JSON.stringify(auxArray))
            }
        }
    }

    const addShoping = async (event) => {
        event.preventDefault();
        if (auxIdUsuario != 0) { //se a iniciado sesión || registrar en la
            if (_auxidCart != '') { //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionShoping/activ--` + _auxidCart, (...args) => fetch(...args).then(res => res.json()))
            } else {
                var resp = fetch(`/api/public/addShoping/${_auxIdCurso}`, (...args) => fetch(...args).then(res => res.json()))
                const response = fetch(`/api/public/listCurso/${_auxIdCurso}`)
                    .then(res => res.json())
                    .then(data => localStorage.setItem("arrayFavCar", JSON.stringify(data)));
            }
        } else {
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                arrayDataCart = JSON.parse(arrayDataCart)
                var encontrado = false
                for (let i = 0; i < arrayDataCart.length; i++) {
                    if (arrayDataCart[i]['idCurso'] == _auxIdCurso) {
                        arrayDataCart[i]['active'] = true
                        encontrado = true
                        break;
                    }
                }
                if (!encontrado) {
                    arrayDataCart.push({ idCurso: _auxIdCurso, active: true })
                }
                localStorage.setItem("arrayDataCart", JSON.stringify(arrayDataCart))
            } else {
                var auxArray = []
                auxArray.push({ idCurso: _auxIdCurso, active: true })
                localStorage.setItem("arrayDataCart", JSON.stringify(auxArray))
            }
        }
    }

    const removeFavorite = async (event) => {
        event.preventDefault();
        if (auxIdUsuario != 0) {
            //verificar si existe en la tabla Favorites
            var _auxId = 0
            var arrayFavCar = localStorage.getItem("arrayFavCar")
            if (arrayFavCar != null && arrayFavCar != '') {
                arrayFavCar = JSON.parse(arrayFavCar)
                if ((arrayFavCar[1].cursoFav[0]) != null) {
                    _auxId = arrayFavCar[1].cursoFav[0].id
                }
            }
            if (_auxidFavorite != '') { //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionFavorites/remov--` + _auxidFavorite, (...args) => fetch(...args).then(res => res.json()))
            } else {
                _auxidFavorite = _auxId
                var resp = fetch(`/api/public/actionFavorites/remov--` + _auxId, (...args) => fetch(...args).then(res => res.json()))
            }
        } else {
            var arrayDataFav = localStorage.getItem("arrayDataFav")
            if (arrayDataFav != null && arrayDataFav != '') {
                var arrayDataFav = localStorage.getItem("arrayDataFav")
                if (arrayDataFav != null && arrayDataFav != '') {
                    arrayDataFav = JSON.parse(arrayDataFav)
                    for (let i = 0; i < arrayDataFav.length; i++) {
                        if (arrayDataFav[i]['idCurso'] == _auxIdCurso && arrayDataFav[i]['active'] == true) {
                            arrayDataFav[i]['active'] = false
                            break;
                        }
                    }
                }
                localStorage.setItem("arrayDataFav", JSON.stringify(arrayDataFav))
            }
        }
    }

    const removeShoping = async (event) => {
        event.preventDefault();
        if (auxIdUsuario != 0) { //se a iniciado sesión || registrar en la
            var _auxId = 0
            var arrayFavCar = localStorage.getItem("arrayFavCar")
            if (arrayFavCar != null && arrayFavCar != '') {
                arrayFavCar = JSON.parse(arrayFavCar)
                if ((arrayFavCar[0].cursoCart[0]) != null) {
                    _auxId = arrayFavCar[0].cursoCart[0].id
                }
            }
            if (_auxidCart != '') { //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionShoping/remov--` + _auxidCart, (...args) => fetch(...args).then(res => res.json()))
            } else {
                _auxidCart = _auxId
                var resp = fetch(`/api/public/actionShoping/remov--` + _auxId, (...args) => fetch(...args).then(res => res.json()))
            }
        } else {
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                var arrayDataCart = localStorage.getItem("arrayDataCart")
                if (arrayDataCart != null && arrayDataCart != '') {
                    arrayDataCart = JSON.parse(arrayDataCart)
                    for (let i = 0; i < arrayDataCart.length; i++) {
                        if (arrayDataCart[i]['idCurso'] == _auxIdCurso && arrayDataCart[i]['active'] == true) {
                            arrayDataCart[i]['active'] = false
                            break;
                        }
                    }
                }
                localStorage.setItem("arrayDataCart", JSON.stringify(arrayDataCart))
            }
        }
    }

    const changeStatus = () => {
        if (btnInscription == 'Inscribirse ahora') {
            var resp = fetch(`/api/public/addProgress/` + _auxIdCurso, (...args) => fetch(...args).then(res => res.json()))
            _setBtnInscription('Ir al curso');
        } else {
            router.push(`/curso/${keyword}/leccion`)
        }
    }

    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var star2 = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full2 = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var heart = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>;
    var heart_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    </svg>;
    var check = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>;

    var cadena = '';
    if (arrayDC != null) {
        var cadena = arrayDC.texto?.split('|,|')
    }

    return (
        <Layout widthPaddingX={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="  min-h-screen text-white w-full px-2 md:px-10">
                {arrayDC != null ?
                    <>
                        <div className='lg:flex xl:flex'>
                            <div className="text-white lg:w-1/2 m-4 w-auto relative h-72 xl:h-auto">
                                <Image
                                    className='h-full rounded-2xl'
                                    src={arrayDC.image}
                                    layout="fill"
                                    objectFit='cover'
                                    objectPosition="top"
                                />
                            </div>
                            <div className="text-white lg:w-1/2 p-4 w-full">
                                <div className='py-2 px-3 '>
                                    <span className='text-3xl font-extrabold'>{arrayDC.title}</span><br />
                                    <span className='text-lg text-slate-400'>por {arrayDC.name}</span>
                                    <div className='flex py-2 items-center'>
                                        {
                                            arrayDC?.calificaciones?.length > 0 ?
                                                <span className='flex text-amber-400 mr-2'>
                                                    {

                                                        [...Array(5)].map((a, as) => (as + 1) <= Math.round(arrayDC?.calificaciones.reduce((a, b) => { return a + b.star }, 0) / arrayDC?.calificaciones.length) ? star_full : "")
                                                    }
                                                </span>
                                                :
                                                ""
                                        }
                                        <span className='text-base text-white my-auto font-semibold'>{arrayDC?.calificaciones?.length} opiniones</span>
                                    </div>
                                    <span className='text-slate-100 py-5 block text-lg'>
                                        {arrayDC.description}
                                    </span>
                                    <p className='text-sm font-semibold mb-2'>Lo que aprenderás:</p>
                                    {cadena?.map((Array, sec_k) => (
                                        <div className='py-0 text-sm' key={sec_k}>
                                            <div className='py-1'>{check} {Array}</div>
                                        </div>
                                    ))}

                                    {arrayDC.price != 0 && arrayDC.price != null ?
                                        <>
                                            <div className="flex items-center justify-between py-5">
                                                <div className='w-full' onClick={() => _setenCarrito(!_enCarrito)}>
                                                    {_enCarrito == false ?
                                                        <button type="button" className="bg-blue-600 hover:bg-blue-600 text-white text-sm py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline" onClick={addShoping}>
                                                            Añadir a la cesta
                                                        </button>
                                                        :
                                                        <button type="button" className="bg-blue-600 hover:bg-blue-600 text-white text-sm py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline" onClick={removeShoping}>
                                                            Quitar de la cesta
                                                        </button>
                                                    }
                                                </div>
                                                <div className='w-1/6  px-1 ' onClick={() => _setesFavorito(!_esFavorito)}>
                                                    {_esFavorito == false ?
                                                        <div className='  border-solid border-2 border-slate-600 py-2 rounded-lg' onClick={addFavorite}>
                                                            <button className="block   mx-auto text-center   w-fit">
                                                                {heart}
                                                            </button>
                                                        </div>
                                                        :
                                                        <div className='  border-solid border-2 border-slate-600 py-2 rounded-lg' onClick={removeFavorite}>
                                                            <button className="block   mx-auto text-center   w-fit">
                                                                {heart_full}
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='block py-3 px-2  text-center rounded-lg  border-solid border-2 border-slate-600'>
                                                Comprar ahora
                                            </div>
                                        </> :
                                        <>
                                            <div className='py-4'>
                                                {auxIdUsuario != 0 ?
                                                    <button type="button" className=" font-extrabold text-xl bg-blue-600 hover:bg-blue-600 text-white   py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline"
                                                        onClick={changeStatus}>
                                                        {btnInscription}
                                                    </button> :
                                                    <Link href="/registro">
                                                        <a className="flex justify-center font-extrabold text-xl bg-blue-600 hover:bg-blue-600 text-white   py-3 px-4 rounded-lg  focus:outline-none focus:shadow-outline" >
                                                            Inscribirse ahora
                                                        </a>
                                                    </Link>
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    : ''
                }

                <div className="block text-white p-4 w-full mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2  text-xs" >
                        <div className='py-0'>
                            <p className='text-xl font-semibold mb-6 lg:mb-3'>Calificaciones de estudiantes</p>
                            {

                                arrayDC?.calificaciones.length > 0 ?
                                    <div className="flex flex-col lg:flex-row gap-3 my-2 text-lg">
                                        <div className='flex items-center mr-5 justify-center'>
                                            <div className='items-start'>
                                                <div className='text-center'>
                                                    <div className='text-5xl font-bold'>
                                                        {
                                                            (arrayDC?.calificaciones.reduce((a, b) => { return a + b.star }, 0) / arrayDC?.calificaciones?.length)?.toFixed(1) ?? 0
                                                        }

                                                    </div>
                                                    <div className=' flex text-amber-400 w-full justify-center'>{[...Array(5)].map((a, as) => (as + 1) <= Math.round(arrayDC?.calificaciones.reduce((a, b) => { return a + b.star }, 0) / arrayDC?.calificaciones.length) ? star_full2 : star2)}</div>
                                                    <div className='py-2'>Valoración del curso</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='py-0 lg:py-6'>
                                            {
                                                [...Array(5)].map((sa, sak) => sak).sort((a, b) => { return b - a }).map((sk) =>
                                                    <div key={sk} className="flex items-center gap-2">
                                                        <div className="bg-gray-200 rounded-full h-3 dark:bg-gray-700 w-52  lg:w-72">
                                                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(100 * (arrayDC?.calificaciones?.filter(c => c.star == (sk + 1)).length / arrayDC?.calificaciones?.length))}%` }}></div>
                                                        </div>
                                                        <div className='flex content-center items-center text-amber-400'>{[...Array(5)].map((a, s) => s <= sk ? star_full2 : "")}<span className='text-slate-300 ml-2'>
                                                            {100 * (arrayDC?.calificaciones?.filter(c => c.star == (sk + 1)).length / arrayDC?.calificaciones?.length)}%
                                                        </span></div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    :
                                    <p className='text-lg italic text-gray-400'>Sin calificaciones</p>
                            }
                        </div>
                        <div className='py-0 mt-10 sm:mt-0'>
                            <p className='text-xl font-semibold mb-6 lg:mb-3'>Comentarios</p>
                            {
                                arrayDC?.calificaciones?.length > 0 ?
                                    <>

                                        {
                                            arrayDC?.calificaciones?.map((cal, cal_key) =>
                                                <div className='pb-2 text-base' key={cal_key}>
                                                    <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2" >
                                                        <div className='py-0 lg:py-6 w-14'>
                                                            <div className="w-10 h-10 rounded-full">
                                                                {
                                                                    cal?.user?.image ?
                                                                        <img
                                                                            className='rounded-full h-full '
                                                                            src={cal?.user?.image}
                                                                            alt="Logo"
                                                                        />
                                                                        :

                                                                        <img
                                                                            className='rounded-full h-full '
                                                                            src="../images/ejemplo2.JPG"
                                                                            alt="Logo"
                                                                        />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='py-0 lg:py-6 w-full'>
                                                            <span className='py-2 font-semibold'>{cal?.user?.name ?? cal?.user?.email}</span>
                                                            <div className='flex py-2 content-center items-center'>
                                                                <span className='flex text-amber-400'>{[...Array(5)].map((a, s) => (s + 1) <= (cal.star ?? 0) ? star_full2 : "")}</span>
                                                                <span className='text-slate-400 ml-2'>{moment(cal.registration_date).calendar()}</span>
                                                            </div>
                                                            <div className='block py-2'>
                                                                {cal?.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (cal_key + 1) == arrayDC?.calificaciones.length ?
                                                            ""
                                                            :
                                                            <div className='block w-full rounded-lg  border-solid border-1 my-4 sm:my-0 border-slate-800'></div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </>
                                    :
                                    <p className='text-lg italic text-gray-400'>Sin comentarios</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}