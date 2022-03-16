import Head from 'next/head'
import { useRouter } from 'next/router';
import React  from 'react';
import Layout, { siteTitle } from "../../components/global/layout";
import useSWR from 'swr'
 
export default function Curso(){
    const router = useRouter()
    const {keyword} = router.query
    var dataDC  = useSWR(`/api/public/curso_ruta/${keyword}`, (...args) => fetch(...args).then(res => res.json())) 
    var arrayDC = dataDC.data

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
    var check = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>;
    var thumbup =   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>;
    var thumbdown = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>;


                
    return(
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head> 
                <div className="  min-h-screen bg-darkblue text-white p-10 w-full px-14">
                    {arrayDC != null ?
                    <>
                    <div className='lg:flex xl:flex'>
                        <div className="bg-darkblue text-white lg:w-1/2  p-4 w-full">
                            <div className='  rounded-lg'>
                                <div className="box-border  p-1  rounded-l-xl   ">
                                    <div className='mx-auto py-5'> 
                                        <div className=' bg-slate-900  rounded-2xl  '>
                                            <div  className='bg-slate-900 px-0 '>
                                                <img
                                                    className=' rounded-2xl w-full'
                                                    src={arrayDC.image}
                                                    alt="Logo"
                                                /> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        <div className="bg-darkblue text-white lg:w-1/2  p-4 w-full">
                            <div className='py-2 px-3 '>
                                <div className='flex py-2'>
                                    <span className='  flex text-amber-400'>
                                        {[...Array(5).keys()].map((a,i)=>i<arrayDC.valuation? star_full : star) }

                                    </span> <span className='text-sm text-slate-400 my-auto px-2'>({arrayDC.valuation})</span> 
                                </div>
                                <span className='text-3xl font-semibold'>{arrayDC.title}</span>
                                
                                <span className='text-slate-100 py-5 block'> 
                                    {arrayDC.description}
                                </span> 
                                <div className="flex items-center justify-between py-5">
                                    <div className='w-full'>
                                        <button type="button" className="bg-violet-700 hover:bg-purple text-white text-sm py-3 px-4 w-full rounded-lg  focus:outline-none focus:shadow-outline" >
                                            Añadir a la cesta
                                        </button>
                                    </div>
                                    <div className='w-1/6  px-1 ' >
                                        <div className='  border-solid border-2 border-slate-600 py-2 rounded-lg' >
                                            <span className="block   mx-auto text-center   w-fit">
                                                {heart}
                                            </span>
                                        </div> 
                                    </div>
                                </div>
                                <div className='block py-3 px-2  text-center rounded-lg  border-solid border-2 border-slate-600'>
                                    Comprar ahora
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="block bg-darkblue text-white  p-4  w-full">
                        <div className='block py-4 px-4 rounded-lg  border-solid border-2 border-slate-600'>
                            <span className='text-xl font-semibold' >Lo que aprenderás</span> 
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-2 text-xs" >
                                <div className='py-0 lg:py-6 '> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                    <div className='py-1'>{check} CSS el lenguaje de estilos que le dará color a tus aplicaciones</div>
                                    <div className='py-1'>{check} CSS grid, la grilla de CSS</div> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                </div>
                                <div className='py-0 lg:py-6'> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                    <div className='py-1'>{check} CSS el lenguaje de estilos que le dará color a tus aplicaciones</div>
                                    <div className='py-1'>{check} CSS grid, la grilla de CSS</div> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                </div>
                                <div className='py-0 lg:py-6'> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                    <div className='py-1'>{check} CSS el lenguaje de estilos que le dará color a tus aplicaciones</div>
                                    <div className='py-1'>{check} CSS grid, la grilla de CSS</div> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                </div>
                                <div className='py-0 lg:py-6'> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                    <div className='py-1'>{check} CSS el lenguaje de estilos que le dará color a tus aplicaciones</div>
                                    <div className='py-1'>{check} CSS grid, la grilla de CSS</div> 
                                    <div className='py-1'>{check} HTML el lenguaje de marcado para la web</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                        : ''
                    }
                    
                    <div className="block bg-darkblue text-white  p-4  w-full">
                        <span className='text-xl font-semibold' >Calificaciones de estudiantes</span> 
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 my-2 text-xs" >
                            <div className='py-0 lg:py-6'> 
                                <div className="flex  gap-3 my-2 text-xs" >
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
                            <div className='py-0 lg:py-6'> 
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
                                            <span className='text-xs'>¿Te ha resultado útil esta reseña?</span>
                                            <div className='flex py-3'>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbup}
                                                    </div>
                                                </div>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbdown}
                                                    </div>
                                                </div>
                                                <div className='px-3 py-2'>
                                                    Denunciar
                                                </div>
                                            </div>  
                                        </div> 
                                    </div>
                                    <div className='block w-full rounded-lg  border-solid border-2 border-slate-600'></div>
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
                                            <span className='text-xs'>¿Te ha resultado útil esta reseña?</span>
                                            <div className='flex py-3'>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbup}
                                                    </div>
                                                </div>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbdown}
                                                    </div>
                                                </div>
                                                <div className='px-3 py-2'>
                                                    Denunciar
                                                </div>
                                            </div>  
                                        </div> 
                                    </div>
                                    <div className='block w-full rounded-lg  border-solid border-2 border-slate-600'></div>
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
                                            <span className='text-xs'>¿Te ha resultado útil esta reseña?</span>
                                            <div className='flex py-3'>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbup}
                                                    </div>
                                                </div>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbdown}
                                                    </div>
                                                </div>
                                                <div className='px-3 py-2'>
                                                    Denunciar
                                                </div>
                                            </div>  
                                        </div> 
                                    </div>
                                    <div className='block w-full rounded-lg  border-solid border-2 border-slate-600'></div>
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
                                            <span className='text-xs'>¿Te ha resultado útil esta reseña?</span>
                                            <div className='flex py-3'>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbup}
                                                    </div>
                                                </div>
                                                <div className='px-3'>
                                                    <div className='w-min py-1 px-1 text-xs rounded-full border-solid border-2 border-slate-800'>
                                                        {thumbdown}
                                                    </div>
                                                </div>
                                                <div className='px-3 py-2'>
                                                    Denunciar
                                                </div>
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




