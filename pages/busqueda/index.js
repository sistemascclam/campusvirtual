import Layout, { siteTitle } from '@global/layout'
import CursoCard from 'components/Curso/cursoCard'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from '@util/Api';
const porPagina = 10
export default function Busqueda() {
    const router = useRouter()
    const { buscar,categoria, pagina = 1, desde, hasta, gratis, descuento, estrellas } = router.query
    const [categoriaFound, setcategoriaFound] = useState(null)

    const loadCursos = async () => {
        const axiosReq = await axios.get(`/api/public/search?perPage=${porPagina}&page=${pagina}${buscar ? `&search=${buscar}`:''}${categoria ? `&slug=${categoria}`:''}${desde ? `&desde=${desde}` : ''}${hasta ? `&hasta=${hasta}` : ''}${gratis ? `&gratis=${gratis}` : ''}${descuento ? `&descuento=${descuento}` : ''}${estrellas ? `&estrellas=${estrellas}` : ''}`);
        const { data } = axiosReq;
        setcategoriaFound(data)
    }

    useEffect(() => {
        if (pagina) {
            loadCursos()
        }
    }, [buscar,categoria, pagina, desde, hasta, gratis, descuento, estrellas])

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='min-h-screen'>
                <h1 className='text-white text-3xl font-semibold'>{categoriaFound?.category ? `Cursos de ${categoriaFound?.category?.name}` : `Búsqueda para "${buscar}"`}</h1>
                <p className='text-white italic'>{categoriaFound?.totals?.cursos} resultados</p>
                {
                    categoriaFound?.cursos && categoriaFound?.cursos.length > 0 ?
                        <>

                            <div className='mt-8 lg:mt-10 mb-0 lg:mb-16'>
                                <span className='text-blue-600 font-bold flex'>Filtros</span>
                                <div className='mt-4 mb-8 flex flex-wrap justify-start gap-y-6'>
                                    {
                                        gratis != 'true' ?
                                            <PrecioInput min={categoriaFound?.totals?.minPrice || 0} max={categoriaFound?.totals?.maxPrice || 0}
                                                setprecios={(min, max) => {
                                                    let params = {
                                                        ...router.query,
                                                        pagina:1,
                                                        desde: min,
                                                        hasta: max,
                                                    }
                                                    if (categoriaFound?.totals?.minPrice == min) {
                                                        delete params.desde
                                                    }
                                                    if (categoriaFound?.totals?.maxPrice == max) {
                                                        delete params.hasta
                                                    }
                                                    router.push({
                                                        pathname: '/busqueda',
                                                        query: params
                                                    })
                                                }} /> : ''
                                    }
                                    <div className={`flex justify-center items-end ${gratis != 'true' ? 'ml-0 lg:ml-14' : ''} mr-6`}>
                                        <div className="flex items-center bg-slate-800 h-9 px-3 rounded">
                                            <input id="cbGratuitos"
                                                onChange={(e) => {
                                                    let params = {
                                                        ...router.query,
                                                        pagina:1,
                                                        gratis: e.target.checked
                                                    }
                                                    if (!e.target.checked) {
                                                        delete params.gratis
                                                    }
                                                    router.push({
                                                        pathname: '/busqueda',
                                                        query: params
                                                    })
                                                }}
                                                defaultChecked={gratis}
                                                type="checkbox" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="cbGratuitos" className="cursor-pointer ml-2 font-medium text-gray-900 dark:text-gray-300">Gratuitos</label>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-end ml-0 lg:ml-3 mr-10'>
                                        <div className="flex items-center bg-slate-800 h-9 px-3 rounded">
                                            <input id="cbDescuento"
                                                onChange={(e) => {
                                                    let params = {
                                                        ...router.query,
                                                        pagina:1,
                                                        descuento: e.target.checked
                                                    }
                                                    if (!e.target.checked) {
                                                        delete params.descuento
                                                    }
                                                    router.push({
                                                        pathname: '/busqueda',
                                                        query: params
                                                    })
                                                }}
                                                defaultChecked={descuento}
                                                type="checkbox" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="cbDescuento" className="cursor-pointer ml-2 font-medium text-gray-900 dark:text-gray-300">Con Descuento</label>
                                        </div>
                                    </div>
                                    <div className='my-auto'>
                                        <p className='text-white flex mb-2'>Calificación</p>
                                        <div className="flex items-center justify-center gap-2">
                                            {
                                                categoriaFound?.totals?.stars?.map((s, sk) => <button key={sk}
                                                    onClick={(e) => {
                                                        let params = {
                                                            ...router.query,
                                                            pagina:1,
                                                            estrellas: s
                                                        }
                                                        if (estrellas == s) {
                                                            delete params.estrellas
                                                        }
                                                        router.push({
                                                            pathname: '/busqueda',
                                                            query: params
                                                        })
                                                    }} className={`text-white flex ${estrellas == s ? 'bg-blue-600' : 'bg-slate-800'} hover:bg-slate-900 rounded w-11 h-9 items-center justify-center transition-all duration-150 ease-in-out`}>
                                                    <div className='flex'>
                                                        <p className='ml-1'>{s}</p>
                                                        <sub>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </sub>
                                                    </div>
                                                </button>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Paginado current={pagina} totalPages={Math.ceil(categoriaFound?.totals?.cursos / porPagina)} />
                            <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-6'>
                                {
                                    categoriaFound?.cursos?.map((curso, key) =>
                                        <CursoCard key={key} Curso={curso} options={true} />
                                    )
                                }
                            </div>
                            <Paginado current={pagina} totalPages={Math.ceil(categoriaFound?.totals?.cursos / porPagina)} />
                        </>
                        :
                        <p className='text-white text-center italic mt-3'>No se encontraron resultados</p>
                }
            </div>
        </Layout>
    )
}

const Paginado = ({ totalPages, current }) => {
    const router = useRouter()
    const { pagina = 1 } = router.query
    return (
        <div className={`flex gap-3 py-2 text-white w-max my-6 mx-auto`}>
            {
                pagina > 1 ?
                    <button
                        onClick={() => router.push({
                            pathname: '/busqueda',
                            query: {
                                ...router.query,
                                pagina: parseInt(pagina) - 1
                            }
                        })}
                        className='shadow-xl bg-slate-800 w-10 h-10 rounded flex justify-center items-center hover:bg-slate-900'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    : ''
            }
            {
                totalPages>1 ? 
                <p className='flex justify-center items-center'>{pagina} de {totalPages}</p> : ''
            }
            {
                pagina < totalPages ?
                    <button
                        onClick={() => router.push({
                            pathname: '/busqueda',
                            query: {
                                ...router.query,
                                pagina: parseInt(pagina) + 1
                            }
                        })}
                        className='shadow-xl bg-slate-800 w-10 h-10 rounded flex justify-center items-center hover:bg-slate-900'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button> : ''
            }
        </div>
    )
}

const PrecioInput = ({ min, max, setprecios }) => {
    const [value, setvalue] = useState([min, max])
    useEffect(() => {
        setvalue([min, max])
    }, [min, max])

    return (
        <div className='w-64'>
            <label className='text-white flex items-center mb-2'>Precio de
                <div className='flex gap-3 ml-2 items-center'>
                    <div className='bg-slate-900 rounded px-2 py-1 font-bold'>
                        S/.{value[0]}
                    </div>
                    <span className='text-white'>a</span>
                    <div className='bg-slate-900 rounded px-2 py-1 font-bold'>
                        S/.{value[1]}
                    </div>
                </div>
            </label>
            <DynamicBounds min={min} max={max} setvalue={setvalue} value={value} setprecios={setprecios} />
        </div>
    )
}

const DynamicBounds = ({ min, max, setvalue, value, setprecios }) => {

    const onSliderChange = (value) => {
        setvalue(value)
        setprecios(parseInt(value[0]), parseInt(value[1]))
    };

    return (
        <div className='mt-5'>
            <Slider
                railStyle={{ height: '6px' }}
                trackStyle={{ backgroundColor: '#2563e5', height: '6px' }}
                handleStyle={{ backgroundColor: 'white' }}
                activeDotStyle={{ color: 'white' }}
                range
                allowCross={false}
                min={min}
                max={max}
                value={value}
                onChange={onSliderChange}
                onAfterChange={onSliderChange}
            />
        </div>
    );
}
