import React, { useEffect, useState } from 'react'
import axios from '@util/Api';
import KRGlue from "@lyracom/embedded-form-glue"
import Layout, { siteTitle } from '@global/layout';
import Head from 'next/head';
import { toMoney } from '@util/helper';
import { useRouter } from 'next/router';

export default function Checkout() {
    const { query, isReady } = useRouter()
    const { codigodescuento } = query
    const [payFormLoaded, setpayFormLoaded] = useState(false)
    const [paiddata, setpaiddata] = useState(null)
    const [error, seterror] = useState(null)
    const [details, setdetails] = useState(null)
    const [discount, setdiscount] = useState(null)
    const [krref, setkrref] = useState(null)


    const [formDataIzi, setformDataIzi] = useState(null)

    const loadCarrito = async () => {
        const axiosReq = await axios.get('/api/public/getCarrito/');
        const { data } = axiosReq;
        setdetails(data);
    }

    const loadIziForm = async () => {
        const axiosReq = await axios.post('/api/checkout', { code: codigodescuento });
        const { data } = axiosReq;
        if (data.status == 'SUCCESS') {
            setformDataIzi(data.answer.formToken)
        } else {
            setpayFormLoaded(true)
            seterror(data.answer.detailedErrorMessage)
        }
    }

    const loaddiscount = async () => {
        const axiosReq = await axios.post(`/api/searchdiscount`, { code: codigodescuento });
        const { data } = axiosReq
        setdiscount(data);
    }


    useEffect(() => {
        return () => {
            console.log("cleaned up",krref);
            if (krref) {
                console.log("krref",krref);
                krref.removeForms()
            }
        };
    }, [krref]);

    useEffect(() => {
        if (isReady) {
            loaddiscount()
            loadCarrito()
        }
    }, [isReady])



    useEffect(() => {
        if (details && !formDataIzi) {
            loadIziForm()
        }
    }, [details])


    useEffect(() => {
        if (formDataIzi) {
            let endpoint = "https://api.micuentaweb.pe";
            let publicKey = process.env.publicIziKey;
            let formToken = formDataIzi;
            KRGlue.loadLibrary(endpoint, publicKey)
                .then(({ KR }) =>
                    KR.setFormConfig({
                        formToken: formToken,
                        "kr-language": "es-ES"
                    })
                )
                .then(({ KR }) => {
                    setpayFormLoaded(true)
                    setkrref(KR)
                    return KR.addForm("#myPaymentForm")
                })
                .then(({ KR, result }) => {
                    KR.showForm(result.formId)
                    KR.onSubmit((res) => {
                        console.log("res",res)
                        dispatch(paypedidoweb({ "pedido_id": res.clientAnswer.orderDetails.orderId, "iziresponse": res.clientAnswer }))
                        if (res.clientAnswer.orderStatus === 'PAID' || res.clientAnswer.orderStatus === 'PARTIALLY_PAID' || res.clientAnswer.orderStatus === 'RUNNING') {
                            setpaiddata(res.clientAnswer);
                            handleEndForm(payMethod.id)
                        } else {
                            seterror("No se pudo completar la transacción.");
                        }
                    })
                })
                .catch(e => {
                    console.log("error");
                    seterror("Error en la transacción")
                });
        }
    }, [formDataIzi])

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='text-2xl font-serif font-bold font-mono text-slate-50'>
                <div className='w-max pb-2 pl-1 pr-2 border-b-2 border-transparent border-blue-600' onClick={()=>console.log(krref)}>
                    Pagar
                </div>
            </div>
            <div className="flex flex-col md:flex-row min-h-screen py-5 gap-6">
                <div className='border-solid border-2 border-slate-800 rounded-2xl bg-slate-800 text-white shadow-lg py-5 w-full md:w-4/12 h-full'>
                    <p className='font-bold text-2xl mx-6 mb-5'>Resumen</p>
                    <hr className='my-3 border-slate-700 border-1' />
                    <p className='font-semibold text-lg mx-6 mt-6 mb-3 text-slate-300'>Detalles:</p>
                    {
                        details?.map((d, di) =>
                            <div key={di} className="flex justify-between mx-6 font-semibold">
                                <p>{d?.curso?.title}</p>
                                <p>S/. {toMoney(d?.curso?.price)}</p>
                            </div>
                        )
                    }
                    {
                        discount ?
                            <>
                                <hr className='my-6 border-slate-700 border-1' />
                                <div className="flex justify-between mx-6 font-semibold text-lg mb-2">
                                    <p>Subtotal</p>
                                    <p>S/. {toMoney(details?.reduce((a, b) => { return a + (b.curso.price ?? 0) }, 0))}</p>
                                </div>
                                <div className="flex justify-between mx-6 font-semibold text-lg mb-2">
                                    <p>Descuento <small className='font-bold'>({discount?.code})</small> </p>
                                    <p>{"-"} S/. {toMoney(discount?.monto)}</p>
                                </div>
                            </> : ""
                    }
                    <hr className='my-6 border-slate-700 border-1' />
                    <div className="flex justify-between mx-6 font-semibold text-3xl mb-2">
                        <p>Total</p>
                        <p>S/. {toMoney(details?.reduce((a, b) => { return a + (b.curso.price ?? 0) }, 0) - (discount?.monto ?? 0))}</p>
                    </div>
                </div>
                <div className='border-solid border-2 border-slate-800 rounded-2xl p-6 bg-slate-800 text-white shadow-lg py-5 w-full md:w-8/12 h-full'>
                    <p className='font-bold text-2xl mb-0'>Información de facturación</p>
                    <div>
                        {!payFormLoaded ?
                            <svg className="animate-spin  h-16 w-16 text-blue-600 mx-auto text-center my-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            :
                            ""
                            // <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-6'>
                            //     <input
                            //         type="text"
                            //         className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2"
                            //         autoFocus={true}
                            //         placeholder="Número de tarjeta"
                            //     />
                            //     <input
                            //         type="text"
                            //         className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2 md:col-span-1"
                            //         autoFocus={true}
                            //         placeholder="MM/AA"
                            //     />
                            //     <input
                            //         type="text"
                            //         className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2 md:col-span-1"
                            //         autoFocus={true}
                            //         placeholder="CVV"
                            //     />
                            // </div>
                        }

                        <div id="myPaymentForm" className="w-full"></div>
                        <div className="text-center">{error}</div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

/*
<div>
                        {!payFormLoaded ?
                        <svg className="animate-spin  h-16 w-16 text-blue-600 mx-auto text-center my-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                            :
                            <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-6'>
                                <input
                                    type="text"
                                    className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2"
                                    autoFocus={true}
                                    placeholder="Número de tarjeta"
                                />
                                <input
                                    type="text"
                                    className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2 md:col-span-1"
                                    autoFocus={true}
                                    placeholder="MM/AA"
                                />
                                <input
                                    type="text"
                                    className="p-6 bg-slate-900 border-slate-900 rounded-xl text-white col-span-2 md:col-span-1"
                                    autoFocus={true}
                                    placeholder="CVV"
                                />
                            </div>
                        }

                        <div id="myPaymentForm" className="w-full"></div>
                        <div className="text-center text-red-500">{error}</div>
                    </div>
*/