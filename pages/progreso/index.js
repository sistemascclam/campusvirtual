import Head from 'next/head'
import { useRouter } from 'next/router';
import Layout, { siteTitle } from "../../components/global/layout";
import React, { useState, useEffect } from 'react';
import { useSession, getSession, getCsrfToken } from 'next-auth/react';
import Image from 'next/image';


var search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
</svg>;
const Star = ({k}) => <svg key={k} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>;
const Star_full = ({k}) => <svg key={k} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " viewBox="0 0 20 20" fill="currentColor">
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>;

export default function Progress() {

    const session = useSession()
    //const [completion, setCompletion] = useState(50);
    let [isOpen, setIsOpen] = useState(false);
    let [nameCurso, setNameCurso] = useState('');
    let [_idProgres, _setIdProgres] = useState(null);
    let [cantstar, setCantstar] = useState(0);
    let [commentaryCurso, SetCommentaryCurso] = useState('');
    let [updateIdQualification, SetUpdateIdQualification] = useState(0);
    let [_data, _setData] = useState(null);
    let [pos, _setPost] = useState(0);
    let [showModal, setShowModal] = useState(false);
    const [txtBusqueda, setTxtBusqueda] = useState('')
    const router = useRouter()
    useEffect(() => {
        if (pos == 0) {
            fetch('/api/public/getProgress/')
                .then(response => response.json())
                .then(data => _setData(data));
            _setPost(1)
        }
    })

    const closeModal = () => {
        setIsOpen(false)
        setShowModal(false)
        //guardar 
        var resp = ''
        if (updateIdQualification == 0) {
            resp = fetch(`/api/public/addQualification/` + cantstar + `-.-` + commentaryCurso + `-.-` + updateIdQualification + `-.-` + _idProgres, (...args) => fetch(...args).then(res => res.json()))
        } else {
            resp = fetch(`/api/public/updateQualification/` + cantstar + `-.-` + commentaryCurso + `-.-` + updateIdQualification + `-.-` + _idProgres, (...args) => fetch(...args).then(res => res.json()))
        }

        fetch('/api/public/getProgress/')
            .then(response => response.json())
            .then(data => _setData(data));
    }
    const openModal = (even, idprogress, qualification) => {
        setNameCurso(even)
        setIsOpen(true)
        _setIdProgres(idprogress)

        if (qualification.length > 0) {
            SetUpdateIdQualification(qualification[0].id)
            setCantstar(qualification[0].star)
            SetCommentaryCurso(qualification[0].description)
        } else {
            SetUpdateIdQualification(0)
            setCantstar(0)
            SetCommentaryCurso('')
        }
        setShowModal(true)
    }
    const changestar = (i) => {
        setCantstar(i)
    }

    function saveComment(even) {
        SetCommentaryCurso(even)
    }

    function buscar(txtBus) {
        setTxtBusqueda(txtBus)
        if (txtBus != '') {
            fetch('/api/public/getProgress/1|.|' + txtBus)
                .then(response => response.json())
                .then(data => _setData(data[0].resultado));
        } else {
            fetch('/api/public/getProgress/')
                .then(response => response.json())
                .then(data => _setData(data));
        }
    }
    
    return (
        <>

            <Layout >
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <div className='flex flex-col md:flex-row pb-2' >
                    <div className='w-full md:w-3/4'>
                        <div className='text-2xl font-serif font-bold font-mono text-slate-50  '>
                            <div className='w-max pl-1 pr-2 pb-2 border-b-2 border-transparent border-blue-600'>
                                Mi progreso
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/4'>
                        <div className='py-2 px-0 md:px-5'>
                            <label className="relative block my-3 md:mt-0">
                                <span className="absolute inset-y-0  flex items-center pl-2">
                                    <div className='py-0 lg:py-6 '>
                                        <div className="  rounded-full ">
                                            {search}
                                        </div>
                                    </div>
                                </span>
                                <input type="search" id="txtBusqueda" name="txtBusqueda" placeholder="Buscar en mi progreso" onChange={event => buscar(event.target.value)} autoComplete='off' required className="shadow bg-slate-100 text-xs appearance-none border rounded-full w-full py-2 pl-8 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="lg:flex md:flex bg-cover bg-top-left min-h-screen ">
                    <div className={`text-white w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1 h-full`}>
                        {_data != null ?
                            _data?.map((Array, sec_k) => (
                                <div className='w-full flex h-40 bg-slate-900 rounded-xl mb-5 shadow-xl cursor-pointer' key={sec_k} onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/curso/${Array.curso.ruta}/leccion`);}}>
                                    <div className='h-40 md:h-auto w-full md:w-3/12 relative'>
                                        <Image
                                            className='rounded-l-xl h-full w-full'
                                            src={Array.curso.image}
                                            alt={Array.curso.title}
                                            objectFit={"cover"}
                                            layout="fill"
                                        />
                                    </div>
                                    <div className='w-full md:w-9/12 px-5 py-2 md:py-4'>
                                        {Array.advance == 0 ?
                                            <div className='flex flex-col justify-between  h-full'>
                                                <div className='my-2'>
                                                    <p className='text-lg line-clamp-2 leading-tight max-h-10'>{Array.curso.title}</p>
                                                    <p className='text-base text-slate-400 leading-tight mt-1'>{Array.curso.name}</p>
                                                </div>
                                                <div className=''>
                                                    <div className='bg-gray-800 rounded-full h-3 mb-1'></div>
                                                    <div className='text-gray-400 font-bold'>
                                                        <span className='text-base'>Empezar curso</span>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            (Array.advance < 100) ?
                                                <div className='w-full'>
                                                    <button className='flex group' onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModal(Array.curso.title, Array.id, Array?.qualification) }}>
                                                        <div className='flex items-center text-amber-50 group-hover:text-blue-600 animation-all duration-300'>
                                                            <StarIndicator q={Array?.qualification} />
                                                        </div>
                                                        <span className='ml-1 text-sm text-slate-200 group-hover:text-blue-600 animation-all duration-300'>
                                                            Calificar
                                                        </span>
                                                    </button>
                                                    <div className='mt-3 mb-2 '>
                                                        <p className='text-lg line-clamp-2 leading-tight max-h-10'>{Array.curso.title}</p>
                                                        <p className='text-base text-slate-400 leading-tight mt-1'>{Array.curso.name}</p>
                                                    </div>
                                                    <div className='text-slate-50 font-bold text-right'>
                                                        <span className='text-sm text-blue-600 mb-1'>{Array.advance}%</span>
                                                        <div className="bg-gray-200 rounded-full h-3 dark:bg-gray-800">
                                                            <div
                                                                style={{ width: Array.advance + '%' }}
                                                                className="bg-blue-600 h-3 rounded-full" ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className='w-full h-full flex flex-col '>
                                                    <div>
                                                        <div className='flex'>
                                                            <button className='flex group' onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModal(Array.curso.title, Array.id, Array?.qualification) }}>
                                                                <div className='flex items-center text-amber-50 group-hover:text-blue-600 animation-all duration-300'>
                                                                    <StarIndicator q={Array?.qualification} />
                                                                </div>
                                                                <span className='ml-1 text-sm text-slate-200 group-hover:text-blue-600 animation-all duration-300'>
                                                                    Calificar
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className='my-2'>
                                                            <p className='text-lg line-clamp-2 leading-tight max-h-10'>{Array.curso.title}</p>
                                                            <p className='text-base text-slate-400 leading-tight mt-1'>{Array.curso.name}</p>
                                                        </div>
                                                    </div>
                                                    <p className='text-md text-blue-600 font-semibold text-left mt-2'>Completado</p>
                                                </div>
                                        }
                                    </div>
                                </div>
                            ))
                            : ''
                        }
                    </div>
                </div>

                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
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
                                                <div className='flex w-full max-w-md justify-center'>
                                                    {
                                                        [...new Set(Array(5).keys())].map((s,si) => <button key={si} onClick={(a, s_i) => changestar(s_i + 1)}> {s <= cantstar ? <Star_full /> : <Star />} </button>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-4 mt-2">
                                                <textarea name="textarea" rows="2" cols="20" defaultValue={commentaryCurso != '' ? commentaryCurso : 'Comentario:'} onChange={event => saveComment(event.target.value)} className="shadow  bg-darkblue appearance-none border rounded w-full text-sm py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                            </div>
                                            <div className="flex flex-col items-center justify-between py-3">
                                                <button type="submit"
                                                    onClick={() => { closeModal() }}
                                                    className="bg-blue-700 hover:bg-blue-600 font-bold text-white text-sm py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
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

const StarIndicator = ({q}) => <>
    {q?.length > 0 ?
        [...new Set(Array(5)?.keys())].map((s,si) => s <= q[0]?.star ?
            <Star_full key={si} /> : <Star key={si} />
        )
        :
        <>
            {<Star/>}{<Star/>}{<Star/>}{<Star/>}{<Star/>}
        </>
    }
</>

//No acceder a la ruta si el usuario NO está logeado
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
