import axios from 'axios';

export default async function handler(req, res) {
    const axiosReq = await axios
        .post('https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment',
            {
                "amount": 1500,
                "currency": "PEN",
                "orderId": "myOrderId-999999",
                "more": "parameters",
                "customer": {
                    "email": "sample@example.com"
                }
            },
            {
                headers: {
                    'Authorization': `Basic ${process.env.IZI_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    const { data } = await axiosReq;
    res.json(data)
}