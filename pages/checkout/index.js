import React, { useEffect, useState } from 'react'
import axios from 'axios'
import KRGlue from "@lyracom/embedded-form-glue"

export default function Checkout() {
    const [payFormLoaded, setpayFormLoaded] = useState(false)
    const [paiddata, setpaiddata] = useState(null)
    const [error, seterror] = useState(null)

    const [formDataIzi, setformDataIzi] = useState(null)


    const loadIziForm=async()=>{
        const axiosReq = await axios
            .get('/api/checkout'
            );
        const { data } = await axiosReq;
        console.log("formdata");
        console.log(data);
        console.log(data.status=='SUCCESS');
        if(data.status=='SUCCESS'){
            setformDataIzi(data.answer.formToken)
        }else{
            setpayFormLoaded(true)
            seterror(data.answer.detailedErrorMessage)
        }
    }

    useEffect(() => {
        loadIziForm()
    }, [])
    
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
                    return KR.addForm("#myPaymentForm")
                })
                .then(({ KR, result }) => {
                    KR.showForm(result.formId)
                    KR.onSubmit((res) => {
                        console.log(res)
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
                    console.log(e);
                    console.log(process.env.publicIziKey);
                    seterror("Error en la transacción")
                });
        }
    }, [formDataIzi])
    return (
        <div>
            {!payFormLoaded ?
                <svg className="animate-spin  h-5 w-5 text-blue-600 mx-auto text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : ""
            }
            <div id="myPaymentForm" className="w-max m-auto"></div>
            <div className="text-center text-red-500">{error}</div>
        </div>
    )
}
