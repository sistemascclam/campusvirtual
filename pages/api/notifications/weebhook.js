import prisma from 'lib/prisma'
const mercadopago = require("mercadopago")

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handle(req, res) {
    const formData = req.body
    const {data}=formData
    const payment_found = mercadopago.payment.findById(data.id)
    // await prisma.ipn.create({
    //     data: {
    //         response: JSON.stringify(formData)+"get:"+JSON.stringify(formQuery),
    //     }
    // })
    // res.json(payment_found)
    res.status(200).json('OK')
}
