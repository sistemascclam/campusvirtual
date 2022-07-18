import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import { getCsrfToken, getSession } from 'next-auth/react';
import axios from '@util/Api';
import { toMoney } from '@util/helper';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export default function MisPedidos() {
    const [misPedidos, setmisPedidos] = useState([])

    useEffect(async () => {
        const misPedidosr = await axios.get(`/api/mis-pedidos`);
        setmisPedidos(misPedidosr.data);
    }, [])

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-3/4'>
                    <div className='text-2xl font-serif font-bold font-mono text-slate-50 '>
                        <div className='w-max pb-2 border-b-2 border-transparent pl-1 pr-2 border-blue-600'>
                            Mis pedidos
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen w-full py-6">
                {
                    misPedidos && misPedidos.length>0 ?
                    <Table dataT={misPedidos} /> 
                    :
                    <div className="   text-center w-full  py-14 border-inherit ">
                        <p className='text-slate-100 text-2xl '>No tienes pedidos pendientes</p>
                    </div>
                }
            </div>

        </Layout>
    )
}

const Table = ({ dataT }) => {
    const [show, setshow] = useState([])
    const handleClickRow = (id) => {
        if (show.includes(id)) {
            setshow(show.filter(s => s != id))
        } else {
            setshow(show.concat(id))
        }
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-base text-left text-gray-400">
                <thead className="text-sm uppercase bg-slate-800 text-gray-300 border-1 border-slate-700">
                    <tr>
                        <th >
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Num. de pedido
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imagen
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Subtotal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descuento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                    </tr>
                </thead>
                {
                    dataT?.map((d, di) =>
                        <tbody key={`${di}`}>
                            <tr className="bg-darkblue border-1 border-slate-700 hover:bg-slate-900 cursor-pointer" onClick={() => handleClickRow(di)}>
                                <td className='pl-3'>
                                    {
                                        show.includes(di) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                    }
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {d.id}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(d?.registration_date).calendar()}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        d.file ?
                                        <a href={d.file} download className='text-blue-400 hover:underline'>Imagen</a>
                                        : 
                                        <span className='text-sm italic'>Sin imagen</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    S/. {toMoney(d.amount)}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        d?.descuento &&
                                        <div className='flex flex-col'>
                                            <p className='text-red-400'>-{d.amountDiscount ? `S/. ${toMoney(d.amountDiscount)}` : '-'}</p>
                                            <p className='text-sm font-bold'>({d?.descuento?.code ?? ""})</p>
                                        </div>
                                    }
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    S/. {toMoney(d.amount - d.amountDiscount)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`
                                    px-3 py-1 rounded-full
                                    text-white
                                    ${d?.status === 0 ? 'bg-blue-900' : ''} 
                                    ${d?.status === 1 ? 'bg-green-900' : ''}
                                    ${d?.status === 2 ? 'bg-red-900' : ''}`}>

                                        {d?.status === 0 ? 'Pendiente' : ''}
                                        {d?.status === 1 ? 'Aprobado' : ''}
                                        {d?.status === 2 ? 'Rechazado' : ''}
                                    </span>
                                </td>
                            </tr>
                            <tr className={`border-1 border-slate-700 ${!show.includes(di) && 'hidden'}`}>
                                <td colSpan={3} >
                                    <table className='w-full border-0 mt-2 mb-10 '>
                                        <thead className="border-0 text-sm uppercase text-gray-300">
                                            <tr>
                                                <th scope="col" className="px-6 py-1">
                                                    #
                                                </th>
                                                <th scope="col" className="px-6 py-1">
                                                    Curso
                                                </th>
                                                <th scope="col" className="px-6 py-1">
                                                    Precio
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                d?.requestedVoucherDetails.map((r, ri) =>
                                                    <tr key={ri}>
                                                        <td className="px-6 py-4">
                                                            {ri + 1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {r.curso.title}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            S/. {toMoney(r.price)}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </td>
                                {
                                    d?.status == 2 ?
                                        <td colSpan={3} >
                                            <div className='w-fit flex mt-2 bg-red-400 p-3 rounded-lg text-white'>
                                                <div>
                                                    <p className='font-bold text-lg'>Motivo del rechazo:</p>
                                                    <p className='text-xl'>{d?.motivo}</p>
                                                </div>
                                            </div>
                                        </td> : ""
                                }
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}

//No acceder a la ruta si el usuario está logeado
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
