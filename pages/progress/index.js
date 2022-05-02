import Head from 'next/head'
import { useRouter } from 'next/router';
import Layout, { siteTitle } from "../../components/global/layout";
import React, { useState, useEffect, Fragment } from 'react';
import { useSession, useReadingProgress } from 'next-auth/react';
import Link from 'next/link'
import useSWR from 'swr'
import { Dialog, Transition } from '@headlessui/react'

import { width } from 'tailwindcss/defaultTheme';

export default function Progress() {

    const session = useSession()
    //const [completion, setCompletion] = useState(50);
    let [isOpen, setIsOpen] = useState(false);
    let [nameCurso, setNameCurso] = useState('');
    let [_idProgres, _setIdProgres] = useState(0);
    let [cantstar, setCantstar] = useState(0);
    let [commentaryCurso, SetCommentaryCurso] = useState('');
    let [updateIdQualification, SetUpdateIdQualification] = useState(0);
    let [_data, _setData] = useState(null);
    let [pos, _setPost] = useState(0);
    let [showModal, setShowModal] = useState(false);
    const [txtBusqueda, setTxtBusqueda] = useState('')
     
    useEffect(() => {
        if(pos == 0){
            fetch('/api/public/getProgress/')
            .then(response => response.json())
            .then(data =>  _setData(data) );
            _setPost(1)
        }
    })

    var search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
    </svg>;
    var star = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-50" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
    var star_full = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>;
 
    const closeModal = () => {
        setIsOpen(false)
        setShowModal(false)
        //guardar 
        var resp = ''
        console.log('ingreso')
        if(updateIdQualification == 0){
            resp = fetch(`/api/public/addQualification/`+cantstar+`-.-`+commentaryCurso+`-.-`+updateIdQualification+`-.-`+_idProgres, (...args) => fetch(...args).then(res => res.json()))
        }else{
            resp = fetch(`/api/public/updateQualification/`+cantstar+`-.-`+commentaryCurso+`-.-`+updateIdQualification+`-.-`+_idProgres, (...args) => fetch(...args).then(res => res.json()))
        }
        
        fetch('/api/public/getProgress/')
        .then(response => response.json())
        .then(data =>  _setData(data) );
    } 
    const openModal = (even, idprogress, qualification) => {
        setNameCurso(even)
        setIsOpen(true)
        _setIdProgres(idprogress)

        if (qualification.length > 0) {
            SetUpdateIdQualification(qualification[0].id)
            setCantstar(qualification[0].star)
            SetCommentaryCurso(qualification[0].description)
        }else{
            SetUpdateIdQualification(0)
            setCantstar(0)
            SetCommentaryCurso('')
        }
        setShowModal(true)
    } 
    const changestar1 = () => {
        setCantstar(1)
    }
    const changestar2 = () => {
        setCantstar(2)
    }
    const changestar3 = () => {
        setCantstar(3)
    }
    const changestar4 = () => {
        setCantstar(4)
    }
    const changestar5 = () => {
        setCantstar(5)
    }
    function saveComment(even){
        SetCommentaryCurso(even)
    }

    function buscar(txtBus){
        setTxtBusqueda(txtBus)
        if(txtBus != ''){ 
                fetch('/api/public/getProgress/1|.|'+txtBus)
                .then(response => response.json())
                .then(data => _setData(data[0].resultado));
        }else{
            fetch('/api/public/getProgress/')
            .then(response => response.json())
            .then(data =>  _setData(data) );
        }
    }
 

    return (
        <>
        
        <Layout >
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='flex ' >
                <div className='w-3/4'>
                    <div className='text-2xl font-serif font-bold font-mono text-slate-50  '>
                        <div className='lg:w-1/3 md:w-1/2 sm:w-1/2 px-5 border-b-2 border-transparent border-sky-700'>
                            Mi progreso
                        </div>
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='py-2 px-5'> 
                        <label className="relative block">
                            <span className="absolute inset-y-0  flex items-center pl-2" onClick={() => buscar(txtBusqueda)}>
                                <div className='py-0 lg:py-6 '>
                                    <Link href="#"><a>
                                    <div className="  rounded-full ">
                                        {search}
                                    </div>
                                    </a></Link>
                                </div>
                            </span>
                            <input type="text" id="txtBusqueda" name="txtBusqueda" placeholder="Buscar en mi lista de deseos" onChange={event => buscar(event.target.value)} autoComplete='off' required className="text-black shadow bg-slate-100 text-xs appearance-none border rounded-full w-full py-2 px-8 text-white leading-tight focus:outline-none focus:shadow-outline" />
                        </label> 
                    </div>
                </div>
            </div>

            <div className="lg:flex md:flex min-h-screen bg-cover bg-top-left py-5 ">
                <div className={`text-white lg:w-2/3`}> 
                    {_data != null ? 
                        _data?.map((Array, sec_k) => (
                            <div className='w-full flex py-3 px-14' key={sec_k}>
                                <div className="text-white w-1/4 w-full h-32 ">
                                    <img
                                        className='rounded-l-lg h-full w-full'
                                        src={Array.curso.image}
                                        alt='title'
                                    />

                                </div>
                                <div className="flex text-white w-3/4 w-full rounded-r-xl bg-slate-800">
                                    {Array.advance == 0 ?
                                            <div className='py-3 px-5 w-full'>
                                                <div>
                                                    <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-bold py-1'>{Array.curso.title}</span>
                                                    <span className='text-sm text-slate-400 leading-5 '>{Array.curso.name}</span>
                                                </div>
                                                <div className='text-slate-50 font-bold'>
                                                    <Link href="#"><a><span className='text-base text-blue-600 '>Empezar curso</span></a></Link>
                                                </div>
                                            </div>
                                    :
                                        (Array.advance >= 60 && Array.advance < 100) ?
                                                <div className='py-3 px-5 w-full'>
                                                    <div className='flex'>
                                                        {/* mostrar si ya tiene la calificación*/}
                                                        <div className='flex'>
                                                            {Array.qualification.length > 0 ?
                                                                <>
                                                                {Array.qualification[0].star == 0 ?
                                                                    <>
                                                                        {star}{star}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 1 ?
                                                                    <>
                                                                        {star_full}{star}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 2 ?
                                                                    <>
                                                                        {star_full}{star_full}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 3 ?
                                                                    <>
                                                                        {star_full}{star_full}{star_full}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 4 ?
                                                                    <>
                                                                        {star_full}{star_full}{star_full}{star_full}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 5 ?
                                                                    <> 
                                                                        {star_full}{star_full}{star_full}{star_full}{star_full}
                                                                    </>:
                                                                    ''
                                                                }
                                                                </>:
                                                                <>
                                                                    {star}{star}{star}{star}{star}
                                                                </>
                                                            }
                                                        </div>
                                                        <div className='px-3 text-xs text-slate-400 hover:text-blue-600' 
                                                        onClick={()=>{openModal(Array.curso.title, Array.id, Array.qualification)}}
                                                        > 
                                                            <Link href="#" ><a >Calificar</a></Link>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-bold py-1'>{Array.curso.title}</span>
                                                        <span className='text-sm text-slate-400 leading-5 '>{Array.curso.name}</span>
                                                    </div>
                                                    <div className='text-slate-50 font-bold text-right'>
                                                        <span className='text-xs text-blue-600'>{Array.advance}%</span>
                                                        <div className="w-100 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                            <div 
                                                            style={{width : Array.advance+'%'}}
                                                            className="bg-blue-600 h-2.5 rounded-full" ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                        :
                                        <div className='py-3 px-5 w-full'>
                                            <div className='flex'>
                                            <div className='flex'>
                                                    <div className='flex'>
                                                            {Array.qualification.length > 0 ?
                                                                <>
                                                                {Array.qualification[0].star == 0 ?
                                                                    <>
                                                                        {star}{star}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 1 ?
                                                                    <>
                                                                        {star_full}{star}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 2 ?
                                                                    <>
                                                                        {star_full}{star_full}{star}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 3 ?
                                                                    <>
                                                                        {star_full}{star_full}{star_full}{star}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 4 ?
                                                                    <>
                                                                        {star_full}{star_full}{star_full}{star_full}{star}
                                                                    </>:
                                                                    Array.qualification[0].star == 5 ?
                                                                    <> 
                                                                        {star_full}{star_full}{star_full}{star_full}{star_full}
                                                                    </>:
                                                                    ''
                                                                }
                                                                </>:
                                                                <>
                                                                    {star}{star}{star}{star}{star}
                                                                </>
                                                            }
                                                        </div>
                                                        <div className='px-3 text-xs text-slate-400 hover:text-blue-600' 
                                                        onClick={()=>{openModal(Array.curso.title, Array.id, Array.qualification)}}
                                                        > 
                                                            <Link href="#" ><a >Calificar</a></Link>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div>
                                                <span className='text-sm line-clamp-2 leading-5 max-h-10 text-slate-50 font-bold py-1'>{Array.curso.title}</span>
                                                <span className='text-sm text-slate-400 leading-5 '>{Array.curso.name}</span>
                                            </div>
                                            <div className='text-slate-50 font-bold text-right'>
                                                <span className='text-base text-blue-600 '>Completado</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                        :''
                    }
                </div>
            </div>
 
            {showModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="w-80 relative w-auto my-6 mx-auto max-w-3xl ">
                    {/*content*/}
                    <div className="  rounded-2xl   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-6 flex-auto bg-gray-900 rounded-2xl">
                            <div className="mt-2 text-center">
                                <div className='text-lg font-medium leading-6 text-slate-50'>
                                    Calificar Curso
                                </div>
                                <p className="text-sm text-slate-300 mt-2">
                                    {nameCurso}
                                </p>
                                <div className="flex items-center text-center py-2  mt-2 ">
                                    <div className='flex inline-block w-full max-w-md justify-center'>
                                        {cantstar == 0 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar5}> {star} </div></a></Link>
                                            </>:
                                            cantstar == 1 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar5}> {star} </div></a></Link>
                                            </>:
                                            cantstar == 2 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar5}> {star} </div></a></Link>
                                            </>:
                                            cantstar == 3 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar5}> {star} </div></a></Link>
                                            </>:
                                            cantstar == 4 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar5}> {star} </div></a></Link>
                                            </>:
                                            cantstar == 5 ?
                                            <>
                                            <Link href="#"><a><div onClick={changestar1}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar2}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar3}> {star_full} </div></a></Link>
                                            <Link href="#"><a><div onClick={changestar4}> {star_full} </div></a></Link> 
                                            <Link href="#"><a><div onClick={changestar5}> {star_full} </div></a></Link>
                                            </>:
                                            ''
                                        }
                                    </div>
                                </div>
                                <div className="mb-4 mt-2"> 
                                    <textarea name="textarea" rows="2" cols="20" defaultValue={commentaryCurso != '' ? commentaryCurso:'Comentario:'} onChange={event => saveComment(event.target.value)} className="shadow  bg-darkblue appearance-none border rounded w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                </div>
                                <div className="flex flex-col items-center justify-between py-3">
                                    <button type="submit"
                                    onClick={()=>{closeModal()}}
                                    className="w-48 bg-blue-700 hover:bg-blue-600 font-bold text-white text-sm py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                                        Calificar
                                    </button>
                                </div>
                            </div>
                        </div> 
                    </div>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

      
        </Layout> 
       
        </>

    )
}