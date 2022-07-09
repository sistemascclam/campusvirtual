import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import useSWR from 'swr'
import Curso from 'components/Curso/curso'
import { getCsrfToken, getSession, useSession } from 'next-auth/react';
import axios from '@util/Api';
import { toMoney } from '@util/helper';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export default function Favoritos() {
    const [aux_Data, setaux_Data] = useState(false)
    const [existeData, setexisteData] = useState(false)
    const [txtBusqueda, setTxtBusqueda] = useState('')
    const [accion, setaccion] = useState('')
    const [misPedidos, setmisPedidos] = useState([])

    const session = useSession()
    const { data: _data } = useSWR('/api/public/getFavoritos/0', (...args) => fetch(...args).then(res => res.json()))

    useEffect(async () => {
        const misPedidosr = await axios.get(`/api/mis-pedidos`);
        setmisPedidos(misPedidosr.data);
    }, [])

    function buscar(txtBus) {
        setTxtBusqueda(txtBus)
        if (txtBus != '') {
            if (accion == 'BD') {
                fetch('/api/public/buscarFavoritos/' + txtBus)
                    .then(response => response.json())
                    .then(data => setaux_Data(data));
                setaccion('BD')
            } else if (accion == 'localStorage') {
                var datoLocal = ''
                var arrayDataFav = localStorage.getItem("arrayDataFav")
                if (arrayDataFav != null && arrayDataFav != '') {
                    datoLocal = arrayDataFav
                }
                fetch('/api/public/buscarFavoritosLocal/' + datoLocal + '--' + txtBus)
                    .then(response => response.json())
                    .then(data => setaux_Data(data));

                setaccion('localStorage')
            }
        } else {
            if (accion == 'BD') {
                fetch('/api/public/getFavoritos/1')
                    .then(response => response.json())
                    .then(_datos => setaux_Data(_datos));
                setaccion('BD')
            } else if (accion == 'localStorage') {
                var datoLocal = ''
                var arrayDataFav = localStorage.getItem("arrayDataFav")
                if (arrayDataFav != null && arrayDataFav != '') {
                    datoLocal = arrayDataFav
                }
                fetch('/api/public/listFavoritesLocalStorage/' + datoLocal + '--1')
                    .then(response => response.json())
                    .then(data => setaux_Data(data));
            }
        }
    }

    var search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
    </svg>;

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
                <div className='w-full md:w-1/4 '>
                    <div className='py-2 px-0 md:px-5'>
                        <label className="relative block mt-3 md:mt-0">
                            <span className="absolute inset-y-0  flex items-center pl-2" onClick={() => buscar(txtBusqueda)}>
                                <div className='py-0 lg:py-6 '>
                                    <div className="rounded-full ">
                                        {search}
                                    </div>
                                </div>
                            </span>
                            <input type="search" id="txtBusqueda" name="txtBusqueda" placeholder="Buscar en mis pedidos" onChange={event => buscar(event.target.value)} autoComplete='off' required className="shadow bg-slate-100 text-xs appearance-none border rounded-full w-full py-2 pl-8 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen w-full py-6">
                <Table dataT={misPedidos} />
            </div>

        </Layout>
    )
}

const Table = ({ dataT }) => {
    console.log(dataT);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-base text-left text-gray-400">
                <thead className="text-sm uppercase bg-slate-800 text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Curso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descuento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pedido #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataT?.map((d, di) => {
                            return d?.requestedVoucherDetails.map((r, ri) =>
                                <tr key={`${di}_${ri}`} className="border-b bg-slate-900 border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {r?.curso?.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        S/. {toMoney(r.price)}
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
                                    <td className="px-6 py-4">
                                        {d?.id}
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
                                    <td className="px-6 py-4">
                                        {moment(d?.registration_date).calendar()}
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
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
