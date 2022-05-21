import React, { Fragment, useEffect, useState } from 'react'
import axios from '@util/Api';
import KRGlue from "@lyracom/embedded-form-glue"
import Layout, { siteTitle } from '@global/layout';
import Head from 'next/head';
import { toMoney, withLeftZeros } from '@util/helper';
import { useRouter } from 'next/router';
import Lottie from "lottie-react";
import lottieJson from '@animations/success.json';
import moment from "moment";
import 'moment/locale/es';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
moment.locale('es')

const answer = {
    "shopId": "89289758",
    "orderCycle": "CLOSED",
    "orderStatus": "PAID",
    "serverDate": "2022-05-14T02:17:51+00:00",
    "orderDetails": {
        "orderTotalAmount": 19704,
        "orderEffectiveAmount": 19704,
        "orderCurrency": "PEN",
        "mode": "TEST",
        "orderId": null,
        "metadata": null,
        "_type": "V4/OrderDetails"
    },
    "customer": {
        "billingDetails": {
            "address": null,
            "category": null,
            "cellPhoneNumber": null,
            "city": null,
            "country": null,
            "district": null,
            "firstName": null,
            "identityCode": null,
            "language": "ES",
            "lastName": null,
            "phoneNumber": null,
            "state": null,
            "streetNumber": null,
            "title": null,
            "zipCode": null,
            "legalName": null,
            "_type": "V4/Customer/BillingDetails"
        },
        "email": "sistemas@cclam.org.pe",
        "reference": null,
        "shippingDetails": {
            "address": null,
            "address2": null,
            "category": null,
            "city": null,
            "country": null,
            "deliveryCompanyName": null,
            "district": null,
            "firstName": null,
            "identityCode": null,
            "lastName": null,
            "legalName": null,
            "phoneNumber": null,
            "shippingMethod": null,
            "shippingSpeed": null,
            "state": null,
            "streetNumber": null,
            "zipCode": null,
            "_type": "V4/Customer/ShippingDetails"
        },
        "extraDetails": {
            "browserAccept": null,
            "fingerPrintId": null,
            "ipAddress": "179.6.47.115",
            "browserUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
            "_type": "V4/Customer/ExtraDetails"
        },
        "shoppingCart": {
            "insuranceAmount": null,
            "shippingAmount": null,
            "taxAmount": null,
            "cartItemInfo": [
                {
                  "productRef": 4,
                  "productLabel": "Administración Aduanera",
                  "productType": "SERVICE_FOR_BUSINESS",
                  "productAmount": "9334.00",
                  "productQty": 1
                },
                {
                  "productRef": 6,
                  "productLabel": "Mercadeo",
                  "productType": "SERVICE_FOR_BUSINESS",
                  "productAmount": "10370.00",
                  "productQty": 1
                }
              ],
            "_type": "V4/Customer/ShoppingCart"
        },
        "_type": "V4/Customer/Customer"
    },
    "transactions": [
        {
            "shopId": "89289758",
            "uuid": "1acea34f4d784af297c108290ed1e082",
            "amount": 19704,
            "currency": "PEN",
            "paymentMethodType": "CARD",
            "paymentMethodToken": null,
            "status": "PAID",
            "detailedStatus": "AUTHORISED",
            "operationType": "DEBIT",
            "effectiveStrongAuthentication": "DISABLED",
            "creationDate": "2022-05-14T02:17:49+00:00",
            "errorCode": null,
            "errorMessage": null,
            "detailedErrorCode": null,
            "detailedErrorMessage": null,
            "metadata": null,
            "transactionDetails": {
                "liabilityShift": "NO",
                "effectiveAmount": 19704,
                "effectiveCurrency": "PEN",
                "creationContext": "CHARGE",
                "cardDetails": {
                    "paymentSource": "EC",
                    "manualValidation": "NO",
                    "expectedCaptureDate": "2022-05-14T02:17:49+00:00",
                    "effectiveBrand": "VISA",
                    "pan": "497010XXXXXX0055",
                    "expiryMonth": 12,
                    "expiryYear": 2025,
                    "country": "PE",
                    "issuerCode": null,
                    "issuerName": null,
                    "effectiveProductCode": "F",
                    "legacyTransId": "948678",
                    "legacyTransDate": "2022-05-14T02:17:49+00:00",
                    "paymentMethodSource": "NEW",
                    "authorizationResponse": {
                        "amount": 19704,
                        "currency": "PEN",
                        "authorizationDate": "2022-05-14T02:17:50+00:00",
                        "authorizationNumber": "3fe903",
                        "authorizationResult": "0",
                        "authorizationMode": "FULL",
                        "_type": "V4/PaymentMethod/Details/Cards/CardAuthorizationResponse"
                    },
                    "captureResponse": {
                        "refundAmount": null,
                        "refundCurrency": null,
                        "captureDate": null,
                        "captureFileNumber": null,
                        "effectiveRefundAmount": null,
                        "effectiveRefundCurrency": null,
                        "_type": "V4/PaymentMethod/Details/Cards/CardCaptureResponse"
                    },
                    "threeDSResponse": {
                        "authenticationResultData": {
                            "transactionCondition": null,
                            "enrolled": null,
                            "status": null,
                            "eci": null,
                            "xid": null,
                            "cavvAlgorithm": null,
                            "cavv": null,
                            "signValid": null,
                            "brand": null,
                            "_type": "V4/PaymentMethod/Details/Cards/CardAuthenticationResponse"
                        },
                        "_type": "V4/PaymentMethod/Details/Cards/ThreeDSResponse"
                    },
                    "authenticationResponse": null,
                    "installmentNumber": 0,
                    "installmentCode": "0",
                    "markAuthorizationResponse": {
                        "amount": null,
                        "currency": null,
                        "authorizationDate": null,
                        "authorizationNumber": null,
                        "authorizationResult": null,
                        "_type": "V4/PaymentMethod/Details/Cards/MarkAuthorizationResponse"
                    },
                    "cardHolderName": null,
                    "identityDocumentNumber": null,
                    "identityDocumentType": null,
                    "initialIssuerTransactionIdentifier": null,
                    "_type": "V4/PaymentMethod/Details/CardDetails"
                },
                "paymentMethodDetails": {
                    "id": "497010XXXXXX0055",
                    "paymentSource": "EC",
                    "manualValidation": "NO",
                    "expectedCaptureDate": "2022-05-14T02:17:49+00:00",
                    "effectiveBrand": "VISA",
                    "expiryMonth": 12,
                    "expiryYear": 2025,
                    "country": "PE",
                    "issuerCode": null,
                    "issuerName": null,
                    "effectiveProductCode": "F",
                    "legacyTransId": "948678",
                    "legacyTransDate": "2022-05-14T02:17:49+00:00",
                    "paymentMethodSource": "NEW",
                    "authorizationResponse": {
                        "amount": 19704,
                        "currency": "PEN",
                        "authorizationDate": "2022-05-14T02:17:50+00:00",
                        "authorizationNumber": "3fe903",
                        "authorizationResult": "0",
                        "authorizationMode": "FULL",
                        "_type": "V4/PaymentMethod/Details/Cards/CardAuthorizationResponse"
                    },
                    "captureResponse": {
                        "refundAmount": null,
                        "refundCurrency": null,
                        "captureDate": null,
                        "captureFileNumber": null,
                        "effectiveRefundAmount": null,
                        "effectiveRefundCurrency": null,
                        "_type": "V4/PaymentMethod/Details/Cards/CardCaptureResponse"
                    },
                    "authenticationResponse": null,
                    "installmentNumber": 0,
                    "installmentCode": "0",
                    "markAuthorizationResponse": {
                        "amount": null,
                        "currency": null,
                        "authorizationDate": null,
                        "authorizationNumber": null,
                        "authorizationResult": null,
                        "_type": "V4/PaymentMethod/Details/Cards/MarkAuthorizationResponse"
                    },
                    "cardHolderName": null,
                    "identityDocumentNumber": null,
                    "identityDocumentType": null,
                    "initialIssuerTransactionIdentifier": null,
                    "_type": "V4/PaymentMethod/Details/PaymentMethodDetails"
                },
                "acquirerDetails": null,
                "fraudManagement": {
                    "_type": "V4/PaymentMethod/Details/FraudManagement"
                },
                "subscriptionDetails": {
                    "subscriptionId": null,
                    "_type": "V4/PaymentMethod/Details/SubscriptionDetails"
                },
                "parentTransactionUuid": null,
                "mid": "1234556",
                "sequenceNumber": 1,
                "taxAmount": null,
                "preTaxAmount": null,
                "taxRate": null,
                "externalTransactionId": "685140",
                "nsu": null,
                "tid": null,
                "acquirerNetwork": "PROCESOS_ISO",
                "taxRefundAmount": null,
                "userInfo": "JS Client",
                "paymentMethodTokenPreviouslyRegistered": null,
                "occurrenceType": "UNITAIRE",
                "_type": "V4/TransactionDetails"
            },
            "_type": "V4/PaymentTransaction"
        }
    ],
    "subMerchantDetails": null,
    "_type": "V4/Payment"
}

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
        const axiosReq = await axios.post('/api/verificarpago', { code: codigodescuento });
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
            console.log("cleaned up", krref);
            if (krref) {
                console.log("krref", krref);
                setpaiddata(null)
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

    // useEffect(() => {
    //     if (details && !formDataIzi) {
    //         loadIziForm()
    //     }
    // }, [details])


    // useEffect(() => {
    //     if (formDataIzi) {
    //         let endpoint = "https://api.micuentaweb.pe";
    //         let publicKey = process.env.publicIziKey;
    //         let formToken = formDataIzi;
    //         KRGlue.loadLibrary(endpoint, publicKey)
    //             .then(({ KR }) =>
    //                 KR.setFormConfig({
    //                     formToken: formToken,
    //                     "kr-language": "es-ES"
    //                 })
    //             )
    //             .then(({ KR }) => {
    //                 setpayFormLoaded(true)
    //                 setkrref(KR)
    //                 return KR.addForm("#myPaymentForm")
    //             })
    //             .then(({ KR, result }) => {
    //                 KR.showForm(result.formId)
    //                 KR.onSubmit((res) => {
    //                     console.log("res",res.clientAnswer)
    //                     if (res.clientAnswer.orderStatus === 'PAID' || res.clientAnswer.orderStatus === 'PARTIALLY_PAID' || res.clientAnswer.orderStatus === 'RUNNING') {
    //                         setpaiddata(res.clientAnswer);
    //                         handleEndForm(payMethod.id)
    //                     } else {
    //                         seterror("No se pudo completar la transacción.");
    //                     }
    //                 })
    //             })
    //             .catch(e => {
    //                 console.log("error");
    //                 seterror("Error en la transacción")
    //             });
    //     }
    // }, [formDataIzi])

    const handleDumbPay = async () => {
        console.log(answer);
        setpaiddata(answer);
        const axiosReq = await axios.post('/api/verificarpago/processpay', { data: answer });
        const { data } = axiosReq;
        console.log(data);
    }

    if (paiddata) {
        return (
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <div className='min-h-screen'>
                    <Transition
                            show={paiddata!=null}
                            appear={true}
                            enter="transform transition duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100 translate-y-0"
                            leave="transform duration-200 transition ease-in-out"
                            leaveFrom="opacity-100 translate-y-0 "
                            leaveTo="opacity-0 "
                    >
                        <DoneCard paiddata={paiddata} />
                    </Transition>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='text-2xl font-serif font-bold font-mono text-slate-50'>
                <div className='w-max pb-2 pl-1 pr-2 border-b-2 border-transparent border-blue-600' onClick={() => console.log(krref)}>
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
                        {payFormLoaded ?
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
                                <button className='bg-blue-600 w-full col-span-2 rounded-2xl py-3' onClick={handleDumbPay}>PAGAR</button>
                            </div>
                        }

                        <div id="myPaymentForm" className="w-full"></div>
                        <div className="text-center">{error}</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const DoneCard = ({ paiddata }) => {
    return (
        <div className='bg-white rounded-3xl shadow-md pt-6 pb-10 my-10 w-4/12 mx-auto'>
            <div className="text-center">
                <div className="mx-auto lg:px-10 max-w-sm lg:max-w-lg">
                    <div className="animate-successcard w-28 h-28 mx-auto">
                        <Lottie
                            loop={false}
                            autoplay={true}
                            animationData={lottieJson}
                            rendererSettings={{
                                preserveAspectRatio: "xMidYMid slice"
                            }}
                        />
                    </div>
                    <p className="font-bold text-3xl text-blue-600">{`¡Pago ${paiddata?.orderStatus === 'PAID' ? 'exitoso' : paiddata?.orderStatus === 'PARTIALLY_PAID' ? 'parcialmente pagado' : 'en proceso'}!`}</p>
                    <p className="font-extrabold text-gray-800 text-5xl my-4">S/.{toMoney(paiddata?.orderDetails?.orderTotalAmount / 100)}</p>
                    <p className='font-medium'>{moment(paiddata?.serverDate).format('lll')}</p>
                    <p className="text-sm leading-none my-4">La constancia del pedido se enviará al correo <span className="text-blue-600">{paiddata?.customer?.email}</span></p>
                    <div className="flex flex-wrap justify-center mx-auto">
                        <Link href="/progreso">
                            <a className="bg-blue-600 text-white px-5 py-2 rounded-full flex justify-center items-center font-medium gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                                Ir a mis cursos
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
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