import React, { useEffect, useState } from 'react';
import axios from '@util/Api';
import { useMercadopago } from "react-sdk-mercadopago";

export default function MercadoPagoButton() {
    const mercadopago = useMercadopago.v2(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
        {
            locale: "es-PE"
        }
    );
    const [rendered, setRendered] = useState(false);

    const loadMercadoPagoButton = async () => {
        const axiosReq = await axios.get('/api/verificarpago/');
        const { data } = axiosReq;
        console.log(data.id);

        mercadopago.checkout({
            preference: {
                id: data.id
            },
            render: {
                container: ".cho-container",
                label: "Pagar"
            }
        });
        setRendered(true);
    }

    useEffect(() => {
        if (mercadopago && !rendered) {
            loadMercadoPagoButton()
        }
    }, [mercadopago, rendered]);

    return (
        <div className="cho-container">
            {
                !rendered && 
                <svg className="animate-spin  h-8 w-8 text-blue-600 mx-auto text-center my-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            }
        </div>
    )
}