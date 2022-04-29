import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout, { siteTitle } from "../../components/global/layout";
import useSWR from 'swr'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link'

export default function Curso() {
    const router = useRouter()
    const { keyword } = router.query
    var dataDC = useSWR(`/api/curso/${keyword}`, (...args) => fetch(...args).then(res => res.json()))
    var arrayDC = dataDC.data
    const session = useSession()
    const [auxIdUsuario, setauxIdUsuario]   = useState(0)
    const [_enCarrito, _setenCarrito]   = useState(false)
    const [_esFavorito, _setesFavorito] = useState(false)
    const [_auxidFavorite, _setauxidFavorite] = useState(0)
    const [_auxactiveFavorite, _setauxactiveFavorite] = useState(false)
    const [_auxidCart, _setauxidCart] = useState(0)
    const [_auxactiveCart, _setauxactiveCart] = useState(false)
    var auxIdCurso = 0
    if (arrayDC != null){
        auxIdCurso = arrayDC.id
    }
    const _auxIdCurso = auxIdCurso

    const localFavorito = async (event) => {
        var arrayDataFav = localStorage.getItem("arrayDataFav")
        if (arrayDataFav != null && arrayDataFav != ''){
            arrayDataFav = JSON.parse(arrayDataFav)
            for (let i = 0; i < arrayDataFav.length; i++) {
                if(arrayDataFav[i]['idCurso'] == _auxIdCurso && arrayDataFav[i]['active'] == true){
                    _setesFavorito(true)
                    break;
                }
            }
        }
    }
    const localCart = async (event) => {
        var arrayDataCart = localStorage.getItem("arrayDataCart")
        if (arrayDataCart != null && arrayDataCart != ''){
            arrayDataCart = JSON.parse(arrayDataCart)
            for (let i = 0; i < arrayDataCart.length; i++) {
                if(arrayDataCart[i]['idCurso'] == _auxIdCurso && arrayDataCart[i]['active'] == true){
                    _setenCarrito(true)
                    break;
                } 
            }
        }
    }

    useEffect(() => {
        if (arrayDC != null){
            if((arrayDC.favorites.length) != 0){
                _setauxidFavorite(arrayDC.favorites[0].id)
                _setesFavorito(arrayDC.favorites[0].active)
            }
            if((arrayDC.shopingCarts.length) != 0){
                _setauxidCart(arrayDC.shopingCarts[0].id)
                _setenCarrito(arrayDC.shopingCarts[0].active)
            }
        }

        if (session.data != null){ //BD
            setauxIdUsuario(session.data.user.id) 
        }else{ //localStorage
            localFavorito()
            localCart() 
        }
    }, [session, arrayDC])


    const addFavorite = async (event) => {
        event.preventDefault();
        if(auxIdUsuario != 0){ //se a iniciado sesión
            //verificar si ya se ha registrado en la BD
            if(_auxidFavorite != ''){ //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionFavorites/activ--`+_auxidFavorite, (...args) => fetch(...args).then(res => res.json()))
            }else{
                var resp = fetch(`/api/public/addFavorites/${_auxIdCurso}`, (...args) => fetch(...args).then(res => res.json()))
                const response = fetch(`/api/public/listCurso/${_auxIdCurso}`)
                .then(res => res.json())
                .then(data => localStorage.setItem("arrayFavCar",JSON.stringify(data)));
            }
        }else{
            var arrayDataFav = localStorage.getItem("arrayDataFav")
            if (arrayDataFav != null && arrayDataFav != '') {
                arrayDataFav = JSON.parse(arrayDataFav)
                var encontrado = false
                for (let i = 0; i < arrayDataFav.length; i++){
                    if(arrayDataFav[i]['idCurso'] == _auxIdCurso){
                        arrayDataFav[i]['active'] = true
                        encontrado = true
                        break;
                    }
                }
                if(!encontrado){
                    arrayDataFav.push({ idCurso: _auxIdCurso, active: true })
                }
                localStorage.setItem("arrayDataFav",JSON.stringify(arrayDataFav))
            }else{
                var auxArray = []
                auxArray.push({ idCurso: _auxIdCurso, active: true })
                localStorage.setItem("arrayDataFav",JSON.stringify(auxArray))
            }
        }
    }

    const addShoping = async (event) => {
        event.preventDefault();
        if(auxIdUsuario != 0){ //se a iniciado sesión || registrar en la
            if(_auxidCart != ''){ //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionShoping/activ--`+_auxidCart, (...args) => fetch(...args).then(res => res.json()))
            }else{
                var resp = fetch(`/api/public/addShoping/${_auxIdCurso}`, (...args) => fetch(...args).then(res => res.json()))
                const response = fetch(`/api/public/listCurso/${_auxIdCurso}`)
                .then(res => res.json())
                .then(data => localStorage.setItem("arrayFavCar",JSON.stringify(data)));
            }
        }else{
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                arrayDataCart = JSON.parse(arrayDataCart)
                var encontrado = false
                for (let i = 0; i < arrayDataCart.length; i++){
                    if(arrayDataCart[i]['idCurso'] == _auxIdCurso){
                        arrayDataCart[i]['active'] = true
                        encontrado = true
                        break;
                    }
                }
                if(!encontrado){
                    arrayDataCart.push({ idCurso: _auxIdCurso, active: true })
                }
                localStorage.setItem("arrayDataCart",JSON.stringify(arrayDataCart))
            }else{
                var auxArray = []
                auxArray.push({ idCurso: _auxIdCurso, active: true })
                localStorage.setItem("arrayDataCart",JSON.stringify(auxArray))
            }
        }
    }

    const removeFavorite = async (event) => {
        event.preventDefault();
        if(auxIdUsuario != 0){ 
            //verificar si existe en la tabla Favorites
            var _auxId = 0
            var arrayFavCar = localStorage.getItem("arrayFavCar")
            if (arrayFavCar != null && arrayFavCar != ''){
                arrayFavCar = JSON.parse(arrayFavCar)
                if((arrayFavCar[1].cursoFav[0]) != null) {
                    _auxId = arrayFavCar[1].cursoFav[0].id
                }
            }
            if(_auxidFavorite != ''){ //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionFavorites/remov--`+_auxidFavorite, (...args) => fetch(...args).then(res => res.json()))
            }else{
                _auxidFavorite = _auxId
                var resp = fetch(`/api/public/actionFavorites/remov--`+_auxId, (...args) => fetch(...args).then(res => res.json()))
            }
        }else{
            var arrayDataFav = localStorage.getItem("arrayDataFav")
            if (arrayDataFav != null && arrayDataFav != '') {
                var arrayDataFav = localStorage.getItem("arrayDataFav")
                if (arrayDataFav != null && arrayDataFav != ''){
                    arrayDataFav = JSON.parse(arrayDataFav)
                    for (let i = 0; i < arrayDataFav.length; i++) {
                        if(arrayDataFav[i]['idCurso'] == _auxIdCurso && arrayDataFav[i]['active'] == true){
                            arrayDataFav[i]['active'] = false 
                            break;
                        }
                    }
                } 
                localStorage.setItem("arrayDataFav",JSON.stringify(arrayDataFav))
            }
        }
    }

    const removeShoping = async (event) => {
        event.preventDefault();
        if(auxIdUsuario != 0){ //se a iniciado sesión || registrar en la
            var _auxId = 0
            var arrayFavCar = localStorage.getItem("arrayFavCar")
            if (arrayFavCar != null && arrayFavCar != ''){
                arrayFavCar = JSON.parse(arrayFavCar)
                if((arrayFavCar[0].cursoCart[0]) != null) {
                    _auxId = arrayFavCar[0].cursoCart[0].id
                }
            }
            if(_auxidCart != ''){ //ya se a registrado en la BD
                var resp = fetch(`/api/public/actionShoping/remov--`+_auxidCart, (...args) => fetch(...args).then(res => res.json()))
            }else{
                _auxidCart = _auxId
                var resp = fetch(`/api/public/actionShoping/remov--`+_auxId, (...args) => fetch(...args).then(res => res.json()))
            }
        }else{
            var arrayDataCart = localStorage.getItem("arrayDataCart")
            if (arrayDataCart != null && arrayDataCart != '') {
                var arrayDataCart = localStorage.getItem("arrayDataCart")
                if (arrayDataCart != null && arrayDataCart != ''){
                    arrayDataCart = JSON.parse(arrayDataCart)
                    for (let i = 0; i < arrayDataCart.length; i++) {
                        if(arrayDataCart[i]['idCurso'] == _auxIdCurso && arrayDataCart[i]['active'] == true){
                            arrayDataCart[i]['active'] = false 
                            break;
                        }
                    }
                } 
                localStorage.setItem("arrayDataCart",JSON.stringify(arrayDataCart))
            }
        }
    }

    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var star2 = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;
    var star_full2 = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var heart = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>;
    var heart_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"  />
    </svg>;
    var check = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>;

    var cadena = '';
    if (arrayDC != null) {
        var cadena = arrayDC.texto?.split('|,|')
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="  min-h-screen text-white w-full">
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
                                    <span className='text-xs text-slate-400 leading-5 '>{arrayDC.name}</span>
                                    <div className='flex py-2'>
                                        <span className='  flex text-amber-400'>
                                            {[...Array(5).keys()].map((a, i) => i < arrayDC.valuation ? <span key={`star_${keyword}_${i}`}>{star_full}</span> : <span key={`star_${keyword}_${i}`}>{star}</span>)}
                                        </span> <span className='text-sm text-blue-600 my-auto px-2 '>27 opiniones</span>
                                    </div>
                                    <span className='text-slate-100 py-5 block'>
                                        {arrayDC.description}
                                    </span>
                                    <span className='text-sm font-semibold' >Lo que aprenderás:</span>
                                    {cadena?.map((Array, sec_k) => (
                                        <div className='py-0 text-xs' key={sec_k}>
                                            <div className='py-1'>{check} {Array}</div>
                                        </div>
                                    ))}

                                    <div className="flex items-center justify-between pt-5 pb-2">
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
                                                        <Link href="#"><a>
                                                        <span className="block   mx-auto text-center   w-fit">
                                                            {heart}
                                                        </span></a></Link>
                                                    </div>
                                                    :
                                                    <div className='  border-solid border-2 border-slate-600 py-2 rounded-lg' onClick={removeFavorite}>
                                                        <Link href="#"><a><span className="block   mx-auto text-center   w-fit">
                                                            {heart_full}
                                                        </span></a></Link>
                                                    </div>
                                                }
                                        </div>
                                        
                                    </div>
                                    <div className='block py-3 px-2  text-center rounded-lg  border-solid border-2 border-slate-600'>
                                        Comprar ahora
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : ''
                }

                <div className="block text-white p-4 w-full mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2  text-xs" >
                        <div className='py-0'>
                            <p className='text-xl font-semibold mb-6'>Calificaciones de estudiantes</p>
                            <div className="flex gap-3 my-2 text-xs">
                                <div className='py-0 lg:py-6 '>
                                    <div className='items-start'>
                                        <div className='text-center'>
                                            <div className='text-5xl font-bold'>4.6</div>
                                            <div className='  flex text-amber-400 w-full justify-center'>{star_full2} {star_full2} {star_full2} {star_full2} {star2} </div>
                                            <div className='py-2'>Valoración del curso</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-0 lg:py-6 w-1/3'>
                                    <div className='py-1'>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full w-4/5" ></div>
                                        </div>
                                    </div>
                                    <div className='py-1'>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full w-1/3" ></div>
                                        </div>
                                    </div>
                                    <div className='py-1'>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full w-1/4" ></div>
                                        </div>
                                    </div>
                                    <div className='py-1'>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full  w-1/5" ></div>
                                        </div>
                                    </div>
                                    <div className='py-1'>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full w-1/6" ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-0 lg:py-6'>
                                    <div className='flex text-amber-400 '>{star_full2} {star_full2} {star_full2} {star_full2} {star_full2}<span className='text-slate-300'>58%</span></div>
                                    <div className='flex text-amber-400 '>{star_full2} {star_full2} {star_full2} {star_full2} {star2}<span className='text-slate-300'>30%</span></div>
                                    <div className='flex text-amber-400 '>{star_full2} {star_full2} {star_full2} {star2} {star2}<span className='text-slate-300'>9%</span></div>
                                    <div className='flex text-amber-400 '>{star_full2} {star_full2} {star2} {star2} {star2}<span className='text-slate-300'>2%</span></div>
                                    <div className='flex text-amber-400 '>{star_full2} {star2} {star2} {star2} {star2}<span className='text-slate-300'>1%</span></div>
                                </div>
                            </div>
                        </div>
                        <div className='py-0 mt-10 sm:mt-0'>
                            <p className='text-xl font-semibold mb-6'>Comentarios</p>
                            <div className='py-2'>
                                <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 text-xs" >
                                    <div className='py-0 lg:py-6 w-14'>
                                        <div className="w-10 h-10 rounded-full bg-red-400">
                                            <img
                                                className='rounded-full h-full '
                                                src="../images/ejemplo2.JPG"
                                                alt="Logo"
                                            />
                                        </div>
                                    </div>
                                    <div className='py-0 lg:py-6 w-full'>
                                        <span className='text-sm py-2'>Andres G.</span>

                                        <div className='flex py-2'>
                                            <span className='  flex text-amber-400'>{star_full2} {star_full2} {star_full2} {star_full2} {star2} </span> <span className='text-sm text-slate-400'> Hace una semana.</span>
                                        </div>
                                        <div className='block py-2 text-sm'>
                                            El curso va muy bien todo lo nevesario para entender desde los mas básico hasta lo as vomplejo de la programación para el frontend web
                                        </div>
                                    </div>
                                </div>
                                <div className='block w-full rounded-lg  border-solid border-1 my-4 sm:my-0 border-slate-800'></div>
                            </div>
                            <div className='py-2'>
                                <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2   text-xs" >
                                    <div className='py-0 lg:py-6 w-14'>
                                        <div className="w-10 h-10 rounded-full bg-red-400">
                                            <img
                                                className='rounded-full h-full '
                                                src="../images/ejemplo2.JPG"
                                                alt="Logo"
                                            />
                                        </div>
                                    </div>
                                    <div className='py-0 lg:py-6 w-full'>
                                        <span className='text-sm py-2'>Andres G.</span>

                                        <div className='flex py-2'>
                                            <span className='  flex text-amber-400'>{star_full2} {star_full2} {star_full2} {star_full2} {star2} </span> <span className='text-sm text-slate-400'> Hace una semana.</span>
                                        </div>
                                        <div className='block py-2 text-sm'>
                                            El curso va muy bien todo lo nevesario para entender desde los mas básico hasta lo as vomplejo de la programación para el frontend web
                                        </div>
                                    </div>
                                </div>
                                <div className='block w-full rounded-lg  border-solid border-1 my-4 sm:my-0 border-slate-800'></div>
                            </div>
                            <div className='py-2'>
                                <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2   text-xs" >
                                    <div className='py-0 lg:py-6 w-14'>
                                        <div className="w-10 h-10 rounded-full bg-red-400">
                                            <img
                                                className='rounded-full h-full '
                                                src="../images/ejemplo2.JPG"
                                                alt="Logo"
                                            />
                                        </div>
                                    </div>
                                    <div className='py-0 lg:py-6 w-full'>
                                        <span className='text-sm py-2'>Andres G.</span>

                                        <div className='flex py-2'>
                                            <span className='  flex text-amber-400'>{star_full2} {star_full2} {star_full2} {star_full2} {star2} </span> <span className='text-sm text-slate-400'> Hace una semana.</span>
                                        </div>
                                        <div className='block py-2 text-sm'>
                                            El curso va muy bien todo lo nevesario para entender desde los mas básico hasta lo as vomplejo de la programación para el frontend web
                                        </div>
                                    </div>
                                </div>
                                <div className='block w-full rounded-lg  border-solid border-1 my-4 sm:my-0 border-slate-800'></div>
                            </div>
                            <div className='py-2'>
                                <div className="flex grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2   text-xs" >
                                    <div className='py-0 lg:py-6 w-14'>
                                        <div className="w-10 h-10 rounded-full bg-red-400">
                                            <img
                                                className='rounded-full h-full '
                                                src="../images/ejemplo2.JPG"
                                                alt="Logo"
                                            />
                                        </div>
                                    </div>
                                    <div className='py-0 lg:py-6 w-full'>
                                        <span className='text-sm py-2'>Andres G.</span>

                                        <div className='flex py-2'>
                                            <span className='  flex text-amber-400'>{star_full2} {star_full2} {star_full2} {star_full2} {star2} </span> <span className='text-sm text-slate-400'> Hace una semana.</span>
                                        </div>
                                        <div className='block py-2 text-sm'>
                                            El curso va muy bien todo lo nevesario para entender desde los mas básico hasta lo as vomplejo de la programación para el frontend web
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}




